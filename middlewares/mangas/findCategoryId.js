import Category from "../../models/Category.js";

const findCategoryId = async (req, res, next) => {
  const chapterData = JSON.parse(req.body.manga);
  req.body.author_id = chapterData.author_id
  req.body.description = chapterData.description
  req.body.title = chapterData.title
  console.log(req.body,"body");

  try {
    const category = await Category.findOne({
      name: chapterData.category_id,
    });
    if (category) {
      console.log("si se pudo");
      req.body.category_id = category._id;
      return next();
    }
    return res.status(404).json({
      success: false,
      response: null,
      message: "category not found",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      response: null,
      message: "server error",
    });
  }
};

export default findCategoryId;
