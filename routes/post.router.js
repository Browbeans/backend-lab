const express = require('express')
const mongoose = require('mongoose')
const Posts = require('../models/post.model')
const cookieSession = require('cookie-session')
const { get } = require('./user.router')
const session = require('../routes/user.router')
const { findByIdAndDelete } = require('../models/post.model')

const postRouter = express.Router()

mongoose.connect('mongodb://localhost:27017/excercise', { useNewUrlParser: true, useUnifiedTopology: true })
postRouter.use(express.json())

postRouter.use(session)
postRouter.get('/', async (req, res) => {
    const result = await Posts.find()
    res.status(200).status(result)
})

postRouter.get('/allPosts', async (req, res) => {
    const allPosts = await Posts.find()
    res.status(200).json(allPosts)
})

postRouter.post('/addPost', async (req, res) => {
    
    if(!req.session.username) {
       return res.status(400).json('You need to sign in to create post')
    }

    const newPost = new Posts(
        {
            _id: mongoose.Types.ObjectId(),
            title: req.body.title, 
            body: req.body.body, 
            author: req.session.username
        }
    ) 
    await newPost.save()
    res.status(201).json(newPost)
})

postRouter.patch('/editPost/:id', async (req, res) => {
    const urlID = req.params.id
    const currentPost = await Posts.findById(urlID)
    if(currentPost.author !== req.session.username) {
        return res.status(401).json('You didnt create post therefor u cant change it')
    }
    const updatePost = {
        title: req.body.title, 
        body: req.body.body
    }
  
    const result = await Posts.findByIdAndUpdate({ _id: urlID }, { $set: updatePost})
    res.status(200).json(result)    
})

postRouter.delete('/deletePost/:id', async (req, res) => {
    const urlID = req.params.id
    const currentPost = await Posts.findById(urlID)
    if(currentPost.author !== req.session.username) {
        return res.status(401).json('Yoo didnt create this post therefor you cant delete it')
    }
    const deleted = await Posts.findByIdAndDelete({_id: urlID})
    res.status(200).json('Deleted' + deleted)
})

module.exports = postRouter