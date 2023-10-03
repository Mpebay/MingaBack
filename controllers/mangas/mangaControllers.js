import Manga from "../../models/Manga.js";

async function getMangas(req, res, next) {
  try {
    const allMangas = await Manga.find();
    res.json({ mangas: allMangas });
  } catch (error) {
    console.log();
  }
}

export default getMangas;
