import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otpCode: {
        type: String,
        default: null,
    },
    otpExpire: {
        type: Date,
        default: null,
    }
},
    {
        versionKey: false
    })

const userModel = model("User", userSchema)

export default userModel;