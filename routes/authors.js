import express from "express";
import { getAllAuthors, getAuthors } from "../controllers/authors/read_me.js";
import admin from "../controllers/authors/admin/admin.js";
import update from "../controllers/authors/admin/update.js";
import passportAdmin from "../middlewares/passport.js";
import finds_id_admin from "../controllers/authors/admin/finds_id_admin.js"

let router = express.Router();

router.get("/", getAllAuthors);
router.get("/me/:id", getAuthors);
router.put("/role/author/:id",passportAdmin.authenticate("jwt", {session:false}),finds_id_admin,update)
router.get(
  "/admin",
   passportAdmin.authenticate("jwt", { session: false }),
  admin
);

export default router;
