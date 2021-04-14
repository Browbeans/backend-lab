import express from 'express'
import fs from 'fs'
import ResponseError from '../responseError.js'

const router = express.Router()
const data = fs.readFileSync('./beer.json')
let beer = JSON.parse(data)

router.post('/', (req, res) => {
    let idToSave = 0
    beer.forEach((todo) => {
        if(todo.id > idToSave) {
            idToSave = todo.id
        }
    })
    idToSave++
    const newBeer = {
        name: req.body.name,
        price: req.body.price, 
        description: req.body.description, 
        id: idToSave
    }
    beer.push(newBeer)
    const data = JSON.stringify(beer, null, 2)
    fs.writeFile("beer.json", data, (err) => {
        if(err) throw err;
        res.status(201).json(newBeer)
    })
})

router.get('/', (req, res) => {
    res.status(200).json(beer)
})

router.get('/:id', (req, res) => {
    const urlID = req.params.id
    const index = beer.findIndex(b => b.id === parseInt(urlID))
    let specificBeer = beer[index]
    if(specificBeer === undefined){
        res.status(404).json(`There is no beer with ${urlID} as id`)
    }
    res.status(200).json(specificBeer)
})

router.delete('/:id', (req, res) => {
    const urlID = req.params.id
    beer = beer.filter((specificBeer) => specificBeer.id !== parseInt(urlID));
    const data = JSON.stringify(beer, null, 2)
    fs.writeFile("beer.json", data, (err) => {
        if(err) throw err;
        res.status(200).json(null)
    })
})

router.put('/:id', (req, res) => {
    const urlID = req.params.id
    const index = beer.findIndex(b => b.id === parseInt(urlID))
    console.log(req.body)
    if(index !== -1) {
        let specificBeer = beer[index]
        specificBeer.name = req.body.name
        specificBeer.price = req.body.price
        specificBeer.description = req.body.description
    }
    const changedBeer = {
        specificBeer: beer[index]
    }
    const data = JSON.stringify(beer, null, 2)
    fs.writeFile("beer.json", data,(err) => {
        if(index === -1) {
            res.status(404).json(`Cant find ${urlID} as an id`)
        }
        res.status(200).json(changedBeer)
    })
})
export default router;