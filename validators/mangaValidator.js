import Joi from "joi";
import JoiOid from "joi-oid";

const mangaValidator = Joi.object({
  author_id: JoiOid.objectId().required(),
  title: JoiOid.string().min(1).max(30).messages({
    "string.empty": "El manga debe tener un nombre",
    "string.min": "El nombre debe tener entre 1 y 30 caracteres ",
    "string.max": "El nombre debe tener entre 1 y 30 caracteres ",
  }),
  cover_photo: JoiOid.string().uri().required().messages({
    "string.empty": "Debe poner una foto de portada",
    "string.uri": "Debes poner un url valido",
    "string.min": "El url es demasiado corto",
  }),
  description: JoiOid.string().min(5).max(700).messages({
    "string.empty": "Debes poner una descripcion",
    "string.min": "La descripcion debe tener entre 5 y 700 caracteres",
    "string.max": "La descripcion debe tener entre 5 y 700 caracteres",
  }),
  category_id: JoiOid.objectId(),
});

export default mangaValidator;
