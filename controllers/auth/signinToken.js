import User from "../../models/User.js";
import Author from "../../models/Author.js"


 const signinToken = async (req, res, next)=>{
    try {
       
        let user = await User.findOneAndUpdate({ email: req.user.email }, { online: true }, { new: true });
        let author = await Author.findOne({user_id: user._id})
        

        const userData = {
            email: user.email,
            photo: user.photo,
            role: user.role,
            author: author._id
        };

        return res.status(200).json({
            response: {user: userData },
            message: 'User signed in with token',
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export default signinToken