import joi from "joi"


//ADD MESSAGE
export const addMessageValidation = {
    body: joi.object({
        content: joi.string().required().messages({
            "any.required": "content for message is required",
        })
    }),

    params: joi.object({
        receiverId: joi.string().hex().min(24).max(24).required().messages({
            "any.required": "id required",
            "string.length": "id doesn't exist"
        }),
    })
}

//DELETE MESSAGE
export const deleteMessageValidation = {
    params: joi.object({
        messageId: joi.string().hex().min(24).max(24).required().messages({
            "any.required": "id required",
            "string.length": "id doesn't exist"
        }),
    })
}
