//Import modules
const express = require('express');
const router = express.Router();
const Eco = require('../models/Ecos');
const conn = require('../database');

router.get('/', async (req, res) => {
    // try {
    //     const ecos = await Eco.find();
    //     console.log("LLEGA");
    //     res.json(ecos);
    // } catch (error) {
    //     res.json({ message: error });
    // }
    console.log("LLEGA a todos")
});

//eco especifico
router.get('/:postId', async (req, res) => {
    try {
        console.log(req.params.postId)
        const eco = await Eco.findById(req.params.postId);
        res.json(eco);
    } catch (err) {
        res.json({ message: err });
    }
    //res.json({message:"GET UNO"});
});

router.post('/:postId', (req, res) => {
    console.log(req.body);
    res.json({message:"POST UNO"});
});

router.put('/:postId', (req, res) => {
    res.json({message:"UPDATE UNO"});
});

router.delete('/:postId', (req, res) => {
    res.json({message:"DELETE UNO"});
});

module.exports = router;