const express = require('express')
const beerRouter = require('./routes/beer.router')
const userRouter = require('./routes/user.router')
const postRouter = require('./routes/post.router')

const app = express()
const port = 3000 

app.use(express.json())
app.use('/api/product', beerRouter)
app.use('/api/user', userRouter)
app.use('/api/posts', postRouter)
app.use(express.static('./public'))

app.listen(port, () => console.log('server is running on http://localhost:3000'))