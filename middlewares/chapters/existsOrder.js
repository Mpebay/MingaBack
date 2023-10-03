import Chapter from "../../models/Chapter";

const existsOrder = async (req, res, next) => {
  const { manga_id, order } = req.body;
  try {
    const mangaChapter = await Chapter.find(manga_id, order);
    if (mangaChapter) {
      return res.status(400).json({
        success: false,
        response: null,
        message: "The chapter number already exists for this manga.",
      });
    }
    return next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export default existsOrder;
