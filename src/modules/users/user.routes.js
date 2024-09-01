import { Router } from "express";
import * as UC from "./user.controller.js"
import { validation } from "../../middleware/validation.js";
import * as UV from "./user.validation.js";
import { auth } from "../../middleware/auth.js";
const router = Router() 

//USER REGISTRATION
router.post('/register', validation(UV.registerValidation) ,UC.userRegistration)

//USER SIGN IN
router.post('/signin', validation(UV.signinValidation) ,UC.signIn)





export default router