import mongoose, { Schema, model } from "mongoose";


const messageSchema = new Schema({

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, {
    versionKey: false
})

const messageModel = model("Message", messageSchema)

export default messageModel;