import Chapter from '../../models/Chapter.js';

const get_me = async (req, res) => {
  try {
    const chapterAuthor = await Chapter.find({ manga_id: req.query.manga_id }); 
    res.json(chapterAuthor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default get_me;