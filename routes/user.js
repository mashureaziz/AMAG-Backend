const express = require('express');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const router = express.Router();

router.post('/user', async(req,res) => {
    const {name, role } = req.body;
        const newUser = new User({
            name,
            role
        });
        await newUser.save();
        res.json(newUser);
});

// router.delete('/movie/:id', async(req,res) => {
//     const {id} = req.params;
//     const deleted = await Movie.findByIdAndDelete(id);
//     res.json(deleted);

// });

// router.patch('/movie/:id' , async(req,res) => {
//     const {id} = req.params;
//     const updated = await Movie.findByIdAndUpdate(id, req.body);
//     res.json(updated);
// })

module.exports = {
     userRouter : router
}