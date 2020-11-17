const express = require('express');
const router = express.Router();
const Eco = require('../models/Ecos');

router.get('/', async (req, res) => {
    try {
        const ecos = await Eco.find().limit(5);
        console.log("LLEGA");
        res.json(ecos);
    } catch (error) {
        res.json({ message: error });
    }
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