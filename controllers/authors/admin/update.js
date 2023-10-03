import User from "../../../models/User.js";

const update = async(req , res, next)=>{
    console.log(req.author._id);
         try {
          let upd_auth = req.author
          upd_auth.active = !upd_auth.active 
          upd_auth.save() 
          let upd =  await User.findOne({_id : req.author.user_id})
          if (upd_auth.active !== false) {
            upd.role = 1
            upd.save()
          }else{
            upd.role = 0
            upd.save()
          }
          if(upd && upd_auth){
            return res.json({ response : upd_auth,
                                menssage: "updated"})
          } else { 
            return res.status(404).json({ message: "not found"})
          }
        } catch (error) {
            return res.status(500).json({ message: "server error " ,error})
        }
    }

export default update