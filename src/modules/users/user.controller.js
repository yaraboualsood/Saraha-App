import userModel from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/globalErrorHandling.js";
import { generateOTP, sendEmail } from "../../service/sendEmail.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

//==========================================User Registration========================================================
export const userRegistration = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body

    //check if email already exists
    const emailExist = await userModel.findOne({ email })
    if (emailExist) {
        return next(new Error("Email already exists", 409))
    }

    //check if username already exists
    const usernameExist = await userModel.findOne({ username });
    if (usernameExist) {
        return next(new Error("Username already exists", 409))

    }

    //hash password 
    const hashedPassword = bcrypt.hashSync(password, 10)

    //generate OTP
    const otp = generateOTP();

    //send OTP to the user's email
    const emailSent = await sendEmail(email, "Your OTP Code", `<p>Your OTP code is <strong>${otp}</strong></p>`);
    const otpExpire = Date.now() + 3600000; // OTP valid for 1 hour
    if (!emailSent) {
        return next(new Error("Failed to send OTP email", 500));
    }

    //create user in db
    await userModel.create({ username, email, password: hashedPassword, otpCode: otp, otpExpire: otpExpire })
    return res.status(201).json({ message: "User registered successfully", user: email, username });

})


//===================================================SIGN IN=========================================================

export const signIn = asyncHandler(async (req, res, next) => {
    const { email, password, otp } = req.body

    //check if user exists
    const user = await userModel.findOne({ email });

    //check if email or password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new Error("Invalid email or password", 400))
    }

    if (otp) {
        //check OTP code
        if (user.otpCode !== otp) {
            return next(new Error("Invalid OTP", 401));
        }

        //Check if OTP has expired
        if (user.otpExpire && Date.now() > user.otpExpire) {
            return next(new Error("OTP has expired", 401));
        }


        //clear the OTP after successful verification
        user.otpCode = null;
        user.otpExpire = null;
        await user.save();

        //generate token
        const token = jwt.sign({ id: user._id }, "yara");
        return res.status(200).json({ message: "Signed in successfully", token });

    } else {

        // If OTP is not provided, generate a new one and send it to the user's email
        const newOtp = generateOTP();
        const otpExpire = Date.now() + 3600000; // OTP valid for 1 hour

        user.otpCode = newOtp;
        user.otpExpire = otpExpire;
        await user.save();

        const emailSent = await sendEmail(email, "Your OTP Code", `<p>Your new OTP code is <strong>${newOtp}</strong></p>`);
        if (!emailSent) {
            return next(new Error("Failed to send OTP email", 500));
        }

        return res.status(200).json({ message: "New OTP sent to your email. Please verify your OTP to sign in." });
    }

})

