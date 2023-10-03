import User from '../../models/User.js';
export default async (req, res) => {
  try {
    const users = await User.find();
    res.json({
        success: true,
        message: "auth",
        response: users
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "error"
    });
  }
}