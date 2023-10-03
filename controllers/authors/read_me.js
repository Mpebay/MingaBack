import Author from "../../models/Author.js";
import User from "../../models/User.js";

async function getAuthors(req, res, next) {
  const { id } = req.params;
  console.log(id);
  const author = {};
  if (!!id) {
    author._id = id;
  }

  try {
    const oneAuthor = await Author.findById(author);
    const authorUser = await User.findById(oneAuthor.user_id);
    res.json({
      author: oneAuthor,
      authorUser: authorUser,
    });
  } catch (error) {
    console.log(error);
  }
}
async function getAllAuthors(req, res, next) {
  try {
    const allAuthors = await Author.find();
    res.json({
      response: allAuthors,
    });
  } catch (error) {
    console.log(error);
  }
}
export { getAuthors, getAllAuthors };
