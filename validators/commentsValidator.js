import joi from "joi";
import joid from "joi-oid";


const commentValidator = joi.object({
    text: joi.string().min(2).max(1000).required().messages({
        "string.empty" : "TEXT_REQUIRED" ,
        "string.min" : "TEXT_TOO_SHORT" ,    
    }),
})

export default commentValidator