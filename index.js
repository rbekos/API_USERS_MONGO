import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3080

app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))

const mongoDB = process.env.MONGO_URI
mongoose .connect (mongoDB , {useNewUrlParser: true});

const db = mongoose .connection ;
//Bind connection to error event (to get notification of connection errors)
db.on("error" , console .error.bind(console , "MongoDB connection error:" ));

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API utilisant Mongo et express')
})

app.use('/', userRouter)

app.listen(port, () => console.log(`Server est route sur le port ${port}`))