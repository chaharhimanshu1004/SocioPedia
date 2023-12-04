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
// import userRoutes from './routes/users.js';
// import authRoutes from './routes/auth.js';
// import postRoutes from './routes/posts.js'
import { register } from './controllers/auth.js'
import {createPost} from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js'
import User from './models/User.js'
import Post from './models/Post.js'
import { users,posts } from './data/index.js'


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
app.post("/auth/register",upload.single('picture'),register);
app.post("/posts",verifyToken,upload.single('picture'),createPost);

// app.use("/auth",authRoutes);
// app.use("/users",userRoutes);
// app.use("/posts",postRoutes);

const PORT = process.env.PORT || 6001

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server PORT : ${PORT}`));
    // add data one time -- therefore ek bar add krke comment out
    //   save krke then comment out all of them
    // User.insertMany(users);
    // Post.insertMany(posts);


}).catch((err)=>console.log(`${err} Server did not connect`));





