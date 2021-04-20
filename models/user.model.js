const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    userName: String, 
    passWord: String, 
    role: String
})

module.exports = mongoose.model('Users', userSchema)
