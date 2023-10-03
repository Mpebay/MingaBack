import Manga from '../../models/Manga.js'

// Controlador para actualizar un manga por ID
const updateManga = async (req, res, next) => {
    const { id } = req.params;
    try {

        console.log("este es el body", req.body)

        const manga = await Manga.findOneAndUpdate({ _id: id }, req.body, { new: true });
        console.log(manga)
        res.status(200).json({
            message: 'Manga actualizado correctamente.',
            response: manga,
        });
    } catch (error) {
        return res.status(404).json({ message: 'Manga no encontrado.' });
    }
};

export default updateManga;