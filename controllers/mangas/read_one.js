import Manga from "../../models/Manga.js"

async function readManga(req, res, next){
    
    const {id} = req.params
    try {
        const unManga = await Manga.findById(id).populate({
            path: "category_id",
            select: "name -_id"
        })
        res.json({manga : unManga})
    } catch (error) {
        console.log(error)
    }
    
}

export default readManga