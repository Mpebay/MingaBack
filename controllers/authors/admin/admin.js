import Author from "../../../models/Author.js";

async function admin(req, res, next) {
  try {
    const authors = await Author.find();
    const active = authors.filter((author) => author.active === true);
    const inactive = authors.filter((author) => author.active === false);
    res.json({
      active: active,
      inactive: inactive,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export default admin;
