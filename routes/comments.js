import express from "express";
import { createComment } from "../controllers/comments/create.js";
import { getAllCommentsFromChapter } from "../controllers/comments/all_from_chapter.js";
import  updateComment  from "../controllers/comments/update.js";
import passport from "passport";
import commentsValidator from "../validators/commentsValidator.js";
import validator from "../middlewares/validator.js";
import isPropertyOfComment from "../middlewares/is_property_of_comment.js";
import destroyComment from "../controllers/comments/destroy.js";

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), createComment);
router.get("/",passport.authenticate("jwt", { session: false }), getAllCommentsFromChapter);
router.put("/:id",passport.authenticate("jwt", { session: false }),isPropertyOfComment, validator(commentsValidator), updateComment);
router.delete("/:id", passport.authenticate("jwt", { session: false }), isPropertyOfComment, destroyComment);

export default router;