import Manga from "../../models/Manga.js";

async function createOne(req, res, next) {
  try {
    const newManga = new Manga(req.body);
    await newManga.save();
    return res.status(201).json({
      success: true,
      response: newManga,
      message: "New manga created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      response: null,
      message: err.message,
    });
  }
}
export default createOne;
