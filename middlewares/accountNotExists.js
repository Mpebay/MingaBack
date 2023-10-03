import User from '../models/User.js'

export default async function(req,res,next) {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found!'
        })
    }
    return next()
}
