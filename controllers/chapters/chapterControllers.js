import Chapter from "../../models/Chapter.js"


async function orderChapters(req, res, next){
    let pagination = {page: 1, limit: 6}
    let {manga_id} = req.query
    if(req.query.page) pagination.page = req.query.page
    if(req.query.quantity) pagination.limit = req.query.quantity
    try {
        const allChapters = await Chapter.find({manga_id}).sort({order: 1}).populate({
            path: "manga_id",
            select: "title"
        })
        .skip(pagination.page > 0 ? (pagination.page-1)*6 : 0)
        .limit(pagination.limit > 0 ? pagination.limit : 0 )
        res.json(allChapters)
    } catch (error) {
        console.log(error)
    }
    
}

export default orderChapters