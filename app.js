import { __dirname } from './utils.js';
import 'dotenv/config.js';
import './config/database.js';
import cors from 'cors';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import bodyParser from 'body-parser'
import admin from "firebase-admin";
import mongoose from 'mongoose'; // Importa la biblioteca mongoose
// import findOrCreatePlugin from 'mongoose-findorcreate';


const serviceAccount = "./firebaseCredentials.json"; 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const router = express.Router();
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

const usuario = mongoose.model("User", usuarioSchema);

// usuarioSchema.plugin(passportLocalMongoose);
// usuarioSchema.plugin(findOrCreatePlugin);

export default app;
