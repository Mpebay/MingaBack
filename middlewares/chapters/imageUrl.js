import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import firestorage from "../imgTransform/firebase.js";

export async function imageUrl(req, res, next) {
 const chapterData = req.body.chapterData? JSON.parse(req.body.chapterData ):req.body.manga? JSON.parse(req.body.manga):null

    try {
        const bucket = firestorage;
        const imgs = req.files||req.file; 
        if (req.files) {
            console.log(req.body, "img");
         const imgUrls = await Promise.all(imgs.map(async (img) => {
            const storagePath = `/mangas/chapters/${Date.now()}-${img.originalname}`;
            const storageRef = ref(bucket, storagePath);
          
            await uploadBytes(storageRef, img.buffer);
            const imgUrl = await getDownloadURL(storageRef);
            return imgUrl;
        }));   
        req.body.pages = imgUrls;
    }else if(req.file){
        const storagePath = `/mangas/${Date.now()}-${imgs.originalname}`;
        const storageRef = ref(bucket, storagePath);
        await uploadBytes(storageRef, imgs.buffer);
        const imgUrl = await getDownloadURL(storageRef);
        
        req.body.cover_photo = imgUrl;
        console.log(req.body,"una sola");
        delete req.body.manga
        }else if ( chapterData.cover_photo ) {
                console.log("que pedo");
                req.body.cover_photo = chapterData.cover_photo
                delete req.body.manga
                delete req.body.file
            }else if (chapterData.pages){
                console.log("casi");
                req.body.pages = chapterData.pages
                delete req.body.chapterData
                delete req.body.files
        }else{
            console.log("hoda");
            throw new Error("Error: falta la portada o las páginas del capítulo.");
        }
        

        
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al subir el archivo." });
    }
}

      
  
