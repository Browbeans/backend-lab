import express from 'express'
import beerRouter from './routes/beer.router.js'

const app = express()
const port = 3000 


app.use('/api/product', beerRouter)
app.use(express.static('./public'))

app.listen(port, () => console.log('server is running on http://localhost:3000'))