import Comment from "../../models/Comment.js";
import User from "../../models/User.js";

export const createComment = async (req, res, next) => {
  try {
    const newComment = new Comment({
       chapter_id: req.body.chapter_id,
       user_id: req.user._id,
       text: req.body.text
    });

    await newComment.save();

    // Obtén el usuario que creó el comentario
    const user = await User.findById(req.user._id).select("photo email");

    newComment.user_id = user;

    return res.status(201).json({
      success: true,
      response: newComment,
      message:"Comment created successfully"
    })
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      response: null,
      message : error.message
    });
  }
};

