import express from 'express'
import User from '../models/user.js'
const authRouter = express.Router()
import bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'


authRouter.post('/register', async (req, res) => {
    try {
        const { firstName, email, password } = req.body
        const emailVerification = await User.findOne({ email: email })
        if (emailVerification) return res.json('Email already taken')

        const generateSalt = await bcrypt.genSalt(10)
        const hashPassword = bcrypt.hashSync(password, generateSalt)

        const user = new User({
            first_name: firstName,
            email: email,
            password: hashPassword
        })
        user.save()
        res.send(`Welecome ${user.first_name}`)

    }
    catch (err) {
        res.json(err)
    }

})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })
        if (!user) return res.json('Email or password incorrect')

        const comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) return res.json('Email or password incorrect')

        const token = Jwt.sign({ id: user._id, firstname: user.first_name }, process.env.JWT_SECRET,{ expiresIn: '1d' } )
        res.header('auth-token', token)

    }
    catch (err) {
        res.json(err)

    }
})

export default authRouter