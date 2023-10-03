import Manga from '../../models/Manga.js'

async function read(req, res, next){
    let queries = {}
    let pagination = {page: 1, limit:4}
    let order = "asc"
    if(req.query.order) order = req.query.order
    if(req.query.page) pagination.page = req.query.page
    if(req.query.quantity) pagination.limit = req.query.quantity

    if(req.query.title) queries.title = new RegExp(req.query.title.trim(),'i') 
    if(req.query.category) queries.category_id = req.query.category.split(",")
    let count = await Manga.estimatedDocumentCount()
    let mangas = await Manga.find(queries).populate("category_id", "name color -_id").populate("author_id", "name -_id").sort({title:order})
    .skip( pagination.page > 0 ? (pagination.page-1)*4 : 0 ) 
    .limit( pagination.limit > 0 ? pagination.limit : 0 ) 
    
    let prevPage = pagination.page > 1 ? pagination.page - 1 : null;
    let nextPage = pagination.page * pagination.limit < count ? Number(pagination.page) + 1 : null;

    return res.status(200).json({
        mangas: mangas,
        prev: prevPage,
        page: Number(pagination.page),
        next: nextPage
    });
}

export default read