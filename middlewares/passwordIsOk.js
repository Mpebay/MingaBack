import User from '../models/User.js'
import   bcrypt from 'bcryptjs'

export default async function(req,res,next) {
    const user = await User.findOne({ email: req.body.email })
    const db_pass = user.password
    const form_pass = req.body.password
    if (bcrypt.compareSync(form_pass,db_pass)) {
        return next()
    }
    return res.status(400).json({
        response: null, message: 'Invalid credentials!'
    })
}
