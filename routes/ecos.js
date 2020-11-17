const express = require('express');
const router = express.Router();
const Eco = require('../models/Eco');

router.get('/', async (req,res) => {
    try {
        const ecos = await Eco.find();
        res.json(ecos);
    } catch (error) {
        res.json({message:error});        
    }
});

//eco especifico
router.get('/:postId', async (req,res) => {
    try{
        eco = await Eco.findById(req.params.postId);
        res.json(eco);
    }catch(err){
        res.json({message:err});
    }
    
});

router.post('/', (req,res) => {
    console.log(req.body);
});

module.exports = router;