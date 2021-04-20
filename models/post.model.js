const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    title: String, 
    body: String, 
    author: String, 
    comment: {
        body: String, 
        author: String
    },
    likes: Number
})

module.exports = mongoose.model('Posts', postSchema)