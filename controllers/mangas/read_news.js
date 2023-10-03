import Manga from "../../models/Manga.js";

async function getNewMangasAuthor(req, res, next) {
  const { id } = req.params;
  const author = {};
  if (!!id) {
    author.author_id = id;
  }
  try {
    const allAuthorMangas = await Manga.find(author);
    if (allAuthorMangas.length < 4) {
      res.json({
        quantity: true,
        response: "insufficient quantity of volumes",
      });
    } else if (allAuthorMangas.length >= 4 && allAuthorMangas.length < 8) {
      const sortedMangas = allAuthorMangas.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      const newsMangas = sortedMangas.slice(0, 2);
      const oldsMangas = sortedMangas.slice(-2);
      const combinedMangas = [...newsMangas, ...oldsMangas];
      res.json({
        all: combinedMangas,
      });
    } else if (allAuthorMangas.length >= 8) {
      const sortedMangas = allAuthorMangas.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      const newsMangas = sortedMangas.slice(0, 4);
      const oldsMangas = sortedMangas.slice(-4);
      res.json({
        news: newsMangas,
        olds: oldsMangas,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default getNewMangasAuthor;
