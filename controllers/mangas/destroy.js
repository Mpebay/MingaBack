import Manga from '../../models/Manga.js'; // Importa el modelo de Manga
import Chapter from '../../models/Chapter.js'; // Importa el modelo de Chapter
import { deleteObject, getStorage, ref, } from '@firebase/storage';
import { initializeApp } from 'firebase/app';
import { urlencoded } from 'express';

// Controlador para eliminar un manga y sus capítulos
const destroyManga = async (req, res, next) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDVHsWL2cN23SA9o3snYIERSI43ef_Ai0M",
    authDomain: "minga-69542.firebaseapp.com",
    projectId: "minga-69542",
    storageBucket: "minga-69542.appspot.com",
    messagingSenderId: "453662409047",
    appId: "1:453662409047:web:eb19cd62708fec6f383e12",
    measurementId: "G-D9HVH707JF"
  };
  const firebase = initializeApp(firebaseConfig)
  const storage = getStorage(firebase) 
  try {
    // Obtén el ID del manga que se debe eliminar desde req.params
    const mangaId = req.params.id;

    // Busca el manga por ID
    const manga = await Manga.findById(mangaId);
    const chapters = await Chapter.findOne({ manga_id: mangaId })
    if (!manga) {
      return res.status(404).json({
        success: false,
        response: null,
        message: ['Manga no encontrado.'],
      });
    }
  //  if (manga.cover_photo.startsWith('https://firebasestorage.googleapis.com')) {
  //   console.log(chapters);
  //    const imageRef = ref(storage, manga.cover_photo);
  //       await deleteObject(imageRef);
  //  }    
  //  console.log("acatoy!!!");
  //      if(chapters.pages !== null){

  //       const imageUrl = chapters.pages
  //       imageUrl.forEach( async url => {
  //         if (url.startsWith('https://firebasestorage.googleapis.com')) {
  //           const imageRef = ref(storage, url);
  //         await deleteObject(imageRef);
  //         }
          
  //       });}
     
      
    // Elimina todos los capítulos correspondientes a ese manga
    await Chapter.deleteMany({ manga_id: mangaId })
    await Manga.findByIdAndDelete(mangaId)

    res.status(200).json({
      success: true,
      response: mangaId,
      message: 'Manga y todos los capítulos correspondientes eliminados correctamente.',
    });
  } catch (error) {
    console.error(error);
  }
};

export default destroyManga;