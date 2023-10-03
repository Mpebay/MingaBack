import { connect } from "mongoose";


connect(process.env.uri_link)
.then(()=>console.log("Conectado a la base de datos"))
.catch(err => console.log(err))

