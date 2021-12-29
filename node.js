const mongoose = require('mongoose');
const book = require('./models/Book');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
//const Book = required('./models/Books)

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));


app.post('/book', async (req, res) => {
    try {
        const { BookName, Author, Publication, Category } = req.body;
        const existingBook = await book.findOne({ BookName });
        if (existingBook) {
            res.status(400).json({message : `${BookName} already exists`});
        }
        else {
        const newBook = new book({ BookName, Author, Publication, Category });
        await newBook.save();
        res.json(newBook);
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message : err.message})
    }


});

// app.get('/getBook', (req, res) => {
//     try {
//         const response = res;
//         res.send(response);
//     } catch (err) {
//         console.log(err.message)
//     }

// })

const connectDB = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/Library");
        app.listen(4000, () => {
            console.log('I am listening at port 4000');
        })

    } catch (err) {
        console.log(err.message);
    }
}
connectDB();
