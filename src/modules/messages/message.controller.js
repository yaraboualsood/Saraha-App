import messageModel from "../../../DB/models/message.model.js";
import userModel from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/globalErrorHandling.js";


// ADD MESSAGE
export const addMessage = asyncHandler(async (req, res, next) => {

    const { content } = req.body
    const { receiverId } = req.params

    const user = await userModel.findById(receiverId)
    if (!user) {
        return next(new Error("Account doesn't exist", 404))
    }
    const createMessage = await messageModel.create({ receiverId: user._id, content })
    return res.status(201).json({ message: "Message sent successfully", createMessage })

})

//READ MESSAGES

export const readMessages = asyncHandler(async (req, res, next) => {

    const messages = await messageModel.find({ receiverId: req.user._id })
    return res.json({ message: "messages fetched successfully", messages })

})


//DELETE MESSAGES

export const deleteMessage = asyncHandler(async (req, res, next) => {

    const { messageId } = req.params
    const deletedMessage = await messageModel.findOneAndDelete({_id: messageId, receiverId: req.user._id},{ new: true });

    if (!deletedMessage) {
        return res.status(404).json({ message: "Message not found or not authorized to delete" });
    }
    res.status(200).json({ message: "successfully deleted", deletedMessage })

})