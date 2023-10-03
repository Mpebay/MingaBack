import Manga from '../../models/Manga.js';
export default async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.json({
        success: true,
        message: "auth",
        response: mangas
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "error"
    });
  }
}