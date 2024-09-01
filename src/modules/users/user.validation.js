import joi from "joi"


//REGISTERATION
export const registerValidation = {
    body: joi.object({
        username: joi.string().min(3).max(15).required().messages({
            "any.required": "username is required",
            "string.min": "username is too short",
        }),
        email: joi.string().email().required().messages({
            "any.required": "email is required",
        }),
        password: joi.string().pattern(new RegExp(/^.{8,}$/)).required().messages({
            "any.required": "password is required"
        }),
    })
}

//SIGN IN
export const signinValidation = {
    body: joi.object({
        email: joi.string().email().required().messages({
            "any.required": "email is required",
        }),
        password: joi.string().pattern(new RegExp(/^.{8,}$/)).required().messages({
            "any.required": "password is required"
        }),
        otp: joi.string().optional(),
    })
}


