const express = require('express')
const fs = require('fs')

const app = express()
const port = 3000 
const data = fs.readFileSync("beer.json")
let beer = JSON.parse(data)



app.use(express.static('./public'))
app.use(express.json())


app.post('/api/product', (req, res) => {
    let idToSave = 0
    beer.forEach((todo) => {
        if(todo.id > idToSave) {
            idToSave = todo.id
        }
    })
    idToSave++
    beer.push({
        name: req.body.name,
        price: req.body.price, 
        description: req.body.description, 
        id: idToSave
    })
    const data = JSON.stringify(beer, null, 2)
    fs.writeFile("beer.json", data, (err) => {
        if(err) throw err;
        res.status(201).json(beer)
    })
})

app.get('/api/product', (req, res) => {
    res.status(200).json(beer)
})

app.get('/api/product/:id', (req, res) => {
    const urlID = req.params.id
    const index = beer.findIndex(b => b.id === parseInt(urlID))
    let specificBeer = beer[index]
    if(specificBeer === undefined){
        res.json({'Error': "Beer with that ID doesnt exist"})
    }
    res.status(200).json(specificBeer)
})

app.delete('/api/product/:id', (req, res) => {
    const urlID = req.params.id
    beer = beer.filter((specificBeer) => specificBeer.id !== parseInt(urlID));
    const data = JSON.stringify(beer, null, 2)
    fs.writeFile("beer.json", data, (err) => {
        if(err) throw err;
        res.status(200).json(null)
    })
})

app.put('/api/product/:id', (req, res) => {

    const urlID = req.params.id
    const index = beer.findIndex(b => b.id === parseInt(urlID))
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
            res.status(404).json('Cant find the ID of the product you want to change')
        }
        res.status(200).json(changedBeer)
    })
})


app.listen(port, () => console.log('server is running on http://localhost:3000'))