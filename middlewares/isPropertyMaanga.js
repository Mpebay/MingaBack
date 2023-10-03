import Manga from "../models/Manga.js";
import Author from "../models/Author.js";

// Middleware para cargar el manga y el autor antes de verificar la propiedad
const isPropertyMaanga = async (req, res, next) => {
    try {
        // Aquí debes cargar el manga y el autor desde la base de datos según el ID proporcionado en req.params.id
        // Luego, asigna la información del manga a req.manga y la información del autor a req.author

        // Por ejemplo:
        const manga = await Manga.findById(req.params.id);
        const author = await Author.findById(manga.author_id);

        if (!manga || !author) {
            return res.status(404).json({
                success: false,
                Response: null,
                message: ['Manga o autor no encontrado.'],
            });
        }

        req.manga = manga;
        req.author = author;

        next();
    } catch (error) {
        next(error);
    }
};

export default isPropertyMaanga;