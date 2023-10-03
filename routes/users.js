import { Router } from "express";
import register from "../controllers/auth/register.js";
import read from "../controllers/auth/read.js";
import signin from "../controllers/auth/signin.js";
import accountNotExists from "../middlewares/accountNotExists.js";
import passwordIsOk from "../middlewares/passwordIsOk.js";
import generateToken from "../middlewares/generateToken.js";
import userValidator from "../validators/userValidator.js";
import validator from "../middlewares/validator.js";
import passport from "../middlewares/passport.js";
import signout from "../controllers/auth/signout.js";
import userSchema from "../schema/userSchema.js";
import hasheador from "../middlewares/hasheador.js";
import findEmail from "../middlewares/findEmail.js";
import passportSession from "../middlewares/passport.js";
import tokenAuth from "../controllers/auth/tokenAuth.js";
import signinToken from "../controllers/auth/signinToken.js";
import googleSignin from "../controllers/auth/googleSignin.js";
import verifyAccount from "../controllers/auth/verifyAccount.js";

const router = Router();
router.get("/", read);
router.post("/signin",validator(userValidator), accountNotExists, passwordIsOk, generateToken, signin )
router.post("/signinToken",passportSession.authenticate("jwt", {session:false}),tokenAuth)
router.post("/signout", passport.authenticate("jwt", {session:false}), signout)
router.post('/register', findEmail, validator(userSchema), hasheador, register);
router.post("/signinToken",passport.authenticate("jwt", {session:false}),signinToken)
router.post("/google-signin", googleSignin)
router.get("/verify/:verify_code", verifyAccount)


export default router;

