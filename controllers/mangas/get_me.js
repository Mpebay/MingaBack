import Manga from '../../models/Manga.js';

const getMyMangas = async (req, res, next) => {
    try {
        let queries = {}
        const userId = req.author._id;
        const mangas = await Manga.find({ author_id: userId }).find(queries).populate("category_id", "name color ").populate("author_id", "name -_id")
        if (!mangas || mangas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron mangas para este autor.' });
        }
        res.status(200).json({ mangas });
    } catch (error) {
        console.log(error);
    }
};

export default getMyMangas