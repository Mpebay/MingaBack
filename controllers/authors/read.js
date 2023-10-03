import Author from '../../models/Author.js';
export default async (req, res) => {
  try {
    const authors = await Author.find();
    res.json({
        success: true,
        message: "auth",
        response: authors
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "error"
    });
  }
}