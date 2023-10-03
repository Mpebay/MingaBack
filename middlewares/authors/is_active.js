import Author from "../../models/Author.js";

async function is_active(req, res, next) {
    const { id } = req.user;
    try {
        const idAuthor = await Author.findOne({ user_id: id });
        if (idAuthor) {
            if (idAuthor.active) {
                next();
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Author not active',
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Author not found',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
}
export default is_active;