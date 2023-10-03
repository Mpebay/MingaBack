import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cd){
        cd(null,"uploads")
        console.log("holas");
    },

    filename : function (req,file,cd){
        cd(null,file.fieldname + "-" +Date.now())
    }
})

const upload = multer({storage: storage})

const uploaded = upload.single("myFile")

export default uploaded
