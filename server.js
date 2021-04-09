const express = require('express')
const app = express()
const port = 3000 

const products = [ 
    {
        "name": "Dugges The South", 
        "price": 35,
        "description": "Fruktig smak med tydlig beska och liten sötma, inslag av apelsinmarmelad, persika, tallbarr, honung, passionsfrukt och grapefrukt.", 
        "id": 1
    },
    {
        "name": "Dugges New School", 
        "price": 75,
        "description": "Nyanserad, rostad, söt smak med inslag av fat, mörk choklad, rostad kokos, kanel, kaffe och soja.",
        "id": 2
    }, 
    {
        "name": "Dugges Citra", 
        "price": 25,
        "description": "Humlearomatisk smak med liten sötma, med inslag av ananas, gula krusbär, sockerkaka och lime.",
        "id": 3
    },
    {
        "name": "Dugges Bubble Gummy", 
        "price": 35,
        "description": "Fruktig smak med tydlig beska, inslag av ananas, nektarin, rosmarin, honung, mango och apelsin.",
        "id": 4
    },
    {
        "name": "Dugges Cherry", 
        "price": 32,
        "description": "Bärig, syrlig smak med tydlig karaktär av körsbär, inslag av mandelmassa och citrus.",
        "id": 5
    } 
]

app.use(express.static('./public'))
app.use(express.json())


app.post('/api/product', (req, res) => {
    products.push(req.body)
    res.status(201).json(req.body)
})

app.get('/api/product', (req, res) => {
    res.json(products)
})

app.delete('/api/product/:id', (req, res) => {
    const urlID = req.params.id
    const index = products.findIndex(p => p.id === parseInt(urlID))
    const deletedProduct = products.splice(index, 1)
    res.json(deletedProduct)
})

app.put('/api/product/:id', (req, res) => {
    const urlID = req.params.id
    const index = products.findIndex(b => b.id === parseInt(urlID))
    const newBeer = products.splice(index, 1, req.body)
    res.json('You changed the beer')
})


app.listen(port, () => console.log('server is running on http://localhost:3000'))