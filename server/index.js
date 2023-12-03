import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",exptended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",exptended:true}))
app.use(cors);
app.use("/assets",express.static(path.join(__dirname,'public/assets')));

// File storage

// anytime someone going to upload anything on your file -- it is going to store in this location

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");

    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage}); // this variable going to be used anytime we are gonna save any file

const PORT = process.env.PORT || 6001

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server PORT : ${PORT}`))

}).catch((err)=>console.log(`${err} Server did not connect`));

console.log("Hello");



