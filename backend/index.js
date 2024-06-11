import express from "express";
import mongoose from "mongoose";
import {PORT, mongodbURL} from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware for parsing req body
app.use(express.json());

//Middleware for handling CORS POLICY
app.use(cors())
//Option 1: Allow all Origins with Default of CORS(*)
// app.use(cors({
//     origin: 'https://localhost:3000',
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-ype']
// }));

app.get('/', (req, res)=>{
            console.log(request);
            return res.status(234).send('Welcome to MERN Stack Tutorial');
        });

app.use('/books',booksRoute);

mongoose.connect(mongodbURL)
        .then(()=>{
            console.log("App is connected to db");



            //routes
            app.listen(PORT,() => {
                console.log(`App is listening to port: ${PORT}`);
            });





        }).catch((error)=>{
            console.log(error);
        })
