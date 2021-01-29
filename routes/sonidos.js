//Import modules
const mongoose = require('mongoose');
const express = require('express');
const conn = require('../database');
const router = express.Router();
const Sonido = require('../models/Sonido');
const { nextTick } = require('async');

//TODO: Gestion de errores

/**
 * 
 *  @swagger
 * 
 * /sonidos/:
 *  get:
 *     tags: ['Sonido']
 *     description: Devuelve todos los sonidos
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         example:
 *         schema:
 *           $ref: '#/components/schemas/Sonido' 
 *       '400':
 *         description: No se ha encontrado el sonido 
 *     parameters:
 *       - name: policy
 *         required: false
 *         x-example: random
*/
router.get('/', async (req, res) => {
    try {
        if (req.query.policy == 'random'){ //En caso de que la política sea adquirir un random
            //Sonido random
            const sonido = await Sonido.countDocuments().exec(function(err,count){
                var random = Math.floor(Math.random()*count);
                Sonido.findOne().skip(random).exec(function(err,result){
                    res.json(result)
                })
            });
            return;
        }
        //Eoc retorna todos los sonidos
        const esp = await Sonido.find();
        if (!esp){
            res.status(400).send({error: 'No se ha encontrado el sonido'}); 
            return;
        }
        res.json(esp);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

/**
 * 
 *  @swagger
 * 
 * /sonidos/{id}:
 *  get:
 *     tags: ['Sonido']
 *     description: Devuelve un sonido segun el id introducido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador del espectrograma
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         example:
 *         schema:
 *           $ref: '#/components/schemas/Sonido' 
 *       '400':
 *         description: No se ha encontrado el sonido indicado
*/
router.get('/:_id', async (req, res) => {
    try {
        const sound = await Sonido.findById(req.params._id);
        if (!sound){
            res.status(400).send({error: 'No se ha encontrado el sonido indicado'}); 
            return;
        }
        res.json(sound);
    } catch (err) {
        res.json({ message: err });
    }
});

/**
 * 
 *  @swagger
 * 
 * /sonidos/:
 *  post:
 *     tags: ['Sonido']
 *     description: Introduce un nuevo sonido
 *     parameters:
 *       - name: Sonido
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Sonido'
 *     responses:
 *       '200':
 *         schema:
 *           $ref: '#/components/schemas/Sonido'
 *         description: Sonido creado
 *       '400':
 *         description: No se ha encontrado el sonido indicado
 */
router.post('/', async (req, res) => {
    const sound = new Sonido({
        _id: req.body._id,
        Ruta: req.body.Ruta,
    });
    try {
        //res.json(esp);
        const savedSound = await sound.save();
        res.json(savedSound);
    } catch (error) {
        console.log(error);
        res.json({ message: error });
    }
});

/**
 * 
 *  @swagger
 * 
 * /sonidos/{id}:
 *  patch:
 *     tags: ['Sonido']
 *     description: Modifica un sonido existente
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador del sonido
 *         required: true
 *       - name: sonido
 *         in: body
 *         description: Campos del sonido a modificar y/o añadir
 *         required: true
 *         schema: 
 *           $ref: '#/components/schemas/Sonido'
 *     example:
 *         schema:
 *           $ref: '#/components/schemas/Sonido' 
 *     responses:
 *       '200':
 *         description: Sonido creado
 *         schema:
 *           $ref: '#/components/schemas/Sonido'
 *       '400':
 *         description: No se ha encontrado el sonido indicado
 */
router.patch('/:_id', async (req, res) => {
    try {
        if (req.body._id){
            delete req.body._id;
        }
        const result = await Sonido.findByIdAndUpdate(req.params._id,req.body);
        res.json(result);
    } catch (error) {
        console.log(error.message)
    } 
});

/**
 * 
 *  @swagger
 * 
 * /sonidos/{id}:
 *  delete:
 *     tags: ['Sonido']
 *     description: Elimina un sonido
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El identificador del sonido
 *         required: true
 *     produces: 
 *       application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: "#/components/schemas/Sonido"
 *       '400':
 *         description: No se ha encontrado el sonido indicado
*/
router.delete('/:_id', async (req, res) => {
    try { 
        const sound = await Sonido.findByIdAndDelete(req.params._id);
        res.json(sound);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;