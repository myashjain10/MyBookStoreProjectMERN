import express from 'express';
import {Book} from '../models/bookModel.js';

const router = express.Router();


//GET ALL BOOKS
router.get("/",async (req,res)=>{
    try{
        const books = await Book.find({});//empty{} means all books


        return res.status(200).send({
            count: books.length,
            data:books

        });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//ADD BOOK
router.post("/",async (req,res) => {
    try{
        //checking whether all fields are sended
        if( !req.body.title || !req.body.author || !req.body.publishYear ){

            return res.status(400).send({
                message: "Send all  required fields :title, author, publishYear"
            });
        }

        //new book object
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        //create book in db
        const book = await Book.create(newBook);

        return res.status(201).send(book);



    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//GET ONE BOOK BY id
router.get('/:id', async (req,res)=>{
    try{
        const { id } = req.params;
        const books = await Book.findById(id);
        return res.status(200).json(books);
    }catch(error){
        console.log(error.message);
        res.status(500).send({ message : error.message });

    }
});

//UPDATE A BOOK
router.put('/:id', async (req,res) =>{
    try{
        const {id} = req.params;

        if( !req.body.title || !req.body.author || !req.body.publishYear ){

            return res.status(400).send({
                message: "Send all  required fields :title, author, publishYear"
            });
        }

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message: "book not found"});
        }
        return res.status(200).send({message: "book updated successfully"});


    }catch(error){
        console.log(error.message);
        res.status(500).send({ message : error.message });

    }
});

//DELETE BOOK
router.delete('/:id', async(req,res)=>{
    try{
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: "book not found"});
        }
        return res.status(200).send({message: "book deleted successfully"});

    }catch(error){
        console.log(error.message);
        res.status(500).send({ message : error.message });

    }
});

export default router;
