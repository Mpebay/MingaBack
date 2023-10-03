import Manga from "../models/Manga.js";

const isPropertyManga = async (req, res, next) => {
    try {

        console.log(req.params)
        const { id } = req.params;
        const manga = await Manga.findById(id);
        if (String(manga.author_id) === String(req.author._id)) {
            console.log(manga)
            next();
        } else {
            res.status(401).json({
                success: false,
                response: null,
                message: 'You are not authorized to perform this action'
            })
        }
    }
    catch (error) {
        console.error(error);
    }
}
export default isPropertyManga;