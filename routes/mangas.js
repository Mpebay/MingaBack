import getNewMangasAuthor from "../controllers/mangas/read_news.js";
import express from "express";
import createOne from "../controllers/mangas/createOne.js";
import findCategoryId from "../middlewares/mangas/findCategoryId.js";
import mangaValidator from "../middlewares/mangas/mangaValidatorMiddle.js";
import schema from "../validators/mangaValidator.js";
import passport from "../middlewares/passport.js";
import readAll from "../controllers/mangas/readAll.js";
import readManga from "../controllers/mangas/read_one.js";
import read from "../controllers/mangas/read.js";
import getMyMangas from "../controllers/mangas/get_me.js";
import finds_id from "../middlewares/finds_id.js";
import is_active from "../middlewares/is_active.js";
import isPropertyManga from "../middlewares/isPropertyManga.js";
import updateManga from "../controllers/mangas/update.js";
import destroyManga from "../controllers/mangas/destroy.js";
import updateMangaSchema from "../schema/updateMangaSchema.js";
import multer from "multer";
import fileFilter from "../middlewares/imgTransform/filterImg.js";
import { imageUrl } from "../middlewares/chapters/imageUrl.js";
import validator from "../middlewares/validator.js";

const storage = multer.memoryStorage()
const upload = multer({storage : storage,
                        fileFilter : fileFilter})
const router = express.Router();

router.get("/me", passport.authenticate("jwt", { session: false }), finds_id, getMyMangas);
router.get("/new/:id", getNewMangasAuthor);
router.get("/allMangas", readAll);
router.get("/", read);
router.get("/:id", readManga);
router.post("/",upload.single("file"), passport.authenticate("jwt", { session: false }), findCategoryId,imageUrl, mangaValidator(schema),createOne);
router.put("/:id", passport.authenticate("jwt", { session: false }), finds_id, is_active, isPropertyManga, validator(updateMangaSchema), updateManga);
router.delete("/:id", passport.authenticate("jwt", { session: false }), finds_id, is_active, isPropertyManga, destroyManga);

export default router;
