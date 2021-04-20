const { Router } = require('express')
const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const Product = require('../models/product.model')


const beerRouter = express.Router()
beerRouter.use(express.json())
const data = fs.readFileSync('./beer.json')
let beer = JSON.parse(data)
mongoose.connect('mongodb://localhost:27017/excercise', { useNewUrlParser: true})

beerRouter.post('/', (req, res) => {
    if(!req.body.name || !req.body.price || !req.body.description || !req.body.image) {
        return res.status(400).json('Data missing')
    }

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price, 
        description: req.body.description, 
        image: req.body.image,
    })
    product
    .save()
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => console.log(err))
})

beerRouter.get('/', (req, res) => {
    Product.find()
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

beerRouter.get('/:id', (req, res) => {
    const urlID = req.params.id
    Product.findById(urlID)
    .exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    })
    .catch(err => {
        res.status(404).json('Sorry')
    })
})

beerRouter.delete('/:id', (req, res) => {
    const urlID = req.params.id
    Product.remove({ _id: urlID })
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

beerRouter.patch('/:id', (req, res) => {
    const urlID = req.params.id

    Product.findByIdAndUpdate(urlID,
        { $set:req.body }, 
        { new:true }
    )
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
module.exports = beerRouter