import Comment from "../../models/Comment.js";
import User from "../../models/User.js";


const destroyComment = async (req, res, next) => {
    try {
        let destroyComment = await Comment.findByIdAndDelete(req.params.id);
        if (destroyComment) {
            const user = await User.findById(req.user._id).select("photo email");
            destroyComment.user_id = user;
            return res.status(200).json({ 
                response: destroyComment });
        } else {
            return res.status(404).json({
                 response: "not found" });
        }
    } catch (error) {
        next(error);
    }
}

export default destroyComment;