import Chapter from '../../models/Chapter.js';
export default async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.json({
        success: true,
        message: "auth",
        response: chapters
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "error"
    });
  }
}