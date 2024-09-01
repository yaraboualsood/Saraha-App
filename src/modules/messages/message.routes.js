import { Router } from "express";
import * as MC from "./message.controller.js"
import { validation } from "../../middleware/validation.js";
import * as MV from "./message.validation.js";
import { auth } from "../../middleware/auth.js";
const router = Router() 

//ADD MESSAGE
router.post("/:receiverId",validation(MV.addMessageValidation), MC.addMessage)

//READ MESSAGE
router.get("/", auth(), MC.readMessages)

//DELETE MESSAGE
router.delete("/:messageId",validation(MV.deleteMessageValidation) ,auth(), MC.deleteMessage)


export default router