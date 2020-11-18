//Import modules
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const conn = require('../database');
const Eco = require('../models/Eco');
const bodyParser = require('body-parser');

//GET Todos los Ecos
router.get('/', async (req, res) => {
    try {
        const ecos = await Eco.find().limit(10);
        res.json(ecos);
    } catch (error) {
        console.log (error);
        res.json({ message: error });
    }
});

//eco especifico
router.get('/:ecoId', async (req, res) => {
    try {
        //console.log(req.params.ecoId)
        const eco = await Eco.findById(req.params.ecoId);
        res.json(eco);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/:ecoId', (req, res) => {
    console.log(req.body);
    res.json({message:"POST UNO"});
});

router.put('/:ecoId', (req, res) => {
    res.json({message:"UPDATE UNO"});
});

router.delete('/:ecoId', (req, res) => {
    res.json({message:"DELETE UNO"});
});

module.exports = router;