const addCoverPhoto = (req, res, next)  =>{
    try {
        if (req.body.cover_photo){
            return next ()
        } else {
            if (req.body.pages[0]){/*si en el cuerpo de la peticion existe el primer elemento del array */ 
                req.body.cover_photo = req.body.pages[0]
                return next ()
            }
            throw new Error ("There re no pages in this chapter")
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Chapter creation failed",
            response : null
        })
    }
}

export default addCoverPhoto