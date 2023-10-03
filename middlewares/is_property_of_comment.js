import Comment from '../models/Comment.js';

const isPropertyOfComment = (req, res, next) => {
  const commentId = req.params.commentId;
  const comment = Comment.findByIdAndUpdate(commentId);
  if (comment.user_id === req.user_id) {
    next();
  } else {
    res.status(401).json({
      success: false,
      response: null,
      message: 'You are not authorized to perform this action',
    });
  }
};

export default isPropertyOfComment;