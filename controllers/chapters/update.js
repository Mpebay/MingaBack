import Chapter from '../../models/Chapter.js';

const update = async (req, res) => {
    const { id } = req.params;
  try {

    const chapter = await Chapter.findOneAndUpdate(
      {_id:id}, 
      req.body,
      
      )

    if (!chapter) {
      return res.status(404).json({ error: 'Capítulo no encontrado' });
    }
    return res.status(200).json({ message: chapter });
  } catch (error) {
    console.error('Error al actualizar el capítulo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default update;