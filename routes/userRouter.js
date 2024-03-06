import express from 'express'
import User from '../models/user.js'
const userRouter = express.Router()

userRouter.get('/users', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(err){
        console.log(err.message)
    }
})

userRouter.post('/users', async (req, res) => {
    try{
        const newUser = await User.create(req.body)
        res.json(newUser)

    }
    catch(err){
        console.log(err.message)
    }
})

userRouter.get('/users/:id', async (req, res) => {
    try{
        const userById = await User.findById(req.params.id)
        res.json(userById)
    }
    catch(err){
        console.log(err.message)
    }
})

userRouter.put('/users/:id', async (req, res) => {
    try{
        const userToUpdateByID = await User.findByIdAndUpdate(req.params.id, {$set : req.body}, {new: true})
        await res.json(userToUpdateByID)
    }
    catch(err){
        console.log(err.message)
    }
})

userRouter.delete('/users/:id', async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.json('User has been delete')
    }
    catch(err){
        console.log(err.message)
    }
})

export default userRouter