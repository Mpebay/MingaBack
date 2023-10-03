import Author from '../models/Author.js';
import Manga from '../models/Manga.js';

export default async function is_property_of(req, res, next) {
  // if (err.status === 400) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Solo se admiten imagenes"
  //   });
  // }
  try {
    const chapterData = JSON.parse(req.body.chapterData);
    console.log(chapterData,"------------------------");
    const user_id = req.user._id
    let mangaFind = await Manga.findById( chapterData.manga_id );
    let authorFind = await Author.findOne({user_id : user_id})
    req.body.manga_id = chapterData.manga_id
    req.body.title = chapterData.title
    req.body.order = chapterData.order
    delete req.body.chapterData
    console.log(req.body,"!!!!!!!!!!");
    if (!mangaFind) {
      return res.status(404).json({
        success: false,
        message: "Manga not found with the given ID"
      });
    }
    
    if (authorFind._id.toString() === mangaFind.author_id.toString()) {
      return next();
    }

    return res.json({
      success: false,
      message: "You are not the owner of this manga"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Internal server error"
    });
  }
}