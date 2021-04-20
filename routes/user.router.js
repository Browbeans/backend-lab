const express = require('express')
const cookieSession = require('cookie-session')
const bcrpyt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user.model')
const { restart } = require('nodemon')

const userRouter = express.Router()
mongoose.connect('mongodb://localhost:27017/excercise', { useNewUrlParser: true})

userRouter.use(cookieSession({
    name: 'session', 
    secret: '5aAf4CUv', 
    secure: false, 
    maxAge: 1000 * 60,
    httpOnly: true
}))

userRouter.post('/register', async(req, res) => {
    const { userName, passWord, role } = req.body
    const existingUsers = await User.find({userName})
    for(let i = 0; i < existingUsers.length; i++ ) {
        if(existingUsers[i].userName === req.body.userName){
            return res.status(400).json('Username already exists')
        }
    }

    const hashedPassword = await bcrpyt.hash(passWord, 10)

    const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        userName: userName, 
        passWord: hashedPassword, 
        role: role
    })

    await newUser.save()
    res.status(201).json(newUser)
})

userRouter.post('/login', async (req, res) => {
    const { userName, passWord} = req.body
    const existingUsers = await User.find({userName})
    const user = existingUsers.find(u => u.userName === userName)
    if(!user || !await bcrpyt.compare(passWord, user.passWord)){
        return res.status(401).json('Incorrect password or username')
    }

    req.session.username = userName
    req.session.role = user.role
    res.status(200).json(null)   
})

userRouter.get('/allUsers', secureWithRole('admin'), async (req, res) =>{
    const result = await User.find()
    res.status(200).json(result)
})



userRouter.delete('/logout', (req, res) => {
    if(!req.session.username) {
        return res.status(400).json('cant sign out')
    }

    req.session = null
    res.status(200).json('You are now signed out')
})


function secure(req, res, next) {
    if(req.session.username) {
        next()
    }else {
        res.status(401).json('you need to sign in to access this')
    }
}

function secureWithRole(role) {
    return [secure, async (req, res, next) => {
        if(req.session.role === role){
            next()
        }else {
            res.status(403).json('You dont have authority to see this info')
        }
    }]
}

module.exports = userRouter