import Joi from "joi";

const fileSchema = Joi.object({
  file: Joi.object({
    data: Joi.binary().required().messages({
      'any.required': 'FILE REQUIRED',
    }),
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required().messages({
      'any.only': 'FILE TYPE MUST BE jpeg, png, or gif'
    })
  }).required()
});

  export default fileSchema