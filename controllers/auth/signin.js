import User from "../../models/User.js";
import Author from "../../models/Author.js"


export default async (req, res, next) => {
    try {
       
        let user = await User.findOneAndUpdate({ email: req.body.email }, { online: true }, { new: true });
        let author = await Author.findOne({user_id: user._id})

        if (!user) {
          
            return res.status(401).json({
                message: 'Authentication failed',
                success: false
            });
        }

        if (!user.verified) {
            return res.status(401).json({
                message: 'User not verified',
                success: false
            });
        }

        const userData = {
            email: user.email,
            photo: user.photo,
            role: user.role,
            author: author ? author._id : null,
        };

        return res.status(200).json({
            response: { token: req.token, user: userData },
            message: 'User signed in with token',
            success: true
        });
    } catch (error) {
        next(error);
    }
};