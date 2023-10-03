const fileValidator = (schema) => (req, res, next)  =>{
    const validation = schema.validate(req.files, { abortEarly: true })
    if(validation.error){
        return res.status(400).json({
            success: false,
            message: validation.error.details.map(error => error.message),      
        })
    }
    return next ()
}

export default fileValidator