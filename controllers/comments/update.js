import Comment from "../../models/Comment.js";
import User from "../../models/User.js";

const controllerComments =
  async (req, res, next) => {

    try {
      let updateComments = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      if (updateComments) {
        // Obtén el usuario que creó el comentario
        const user = await User.findById(req.user._id).select("photo email");

        updateComments.user_id = user;
        return res.status(200).json({ response: updateComments })
      } else {
        return res.status(404).json({ response: "not found" })
      }
    } catch (error) { next(error) }
  }


export default controllerComments
