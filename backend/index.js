const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000
const URL = "mongodb://localhost:27017/booksDB"
const app = express()
const productRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(URL)



app.get('/',(req,res)=>{
    console.log("asdjaslkd")
    res.send('Testing')})

app.get('/test',(req,res)=>{
    console.log("asdjaslkd")
        res.send('Testing')})
        
app.use("/api/users", userRouter);        
app.use("/api/products", productRouter);

app.listen(PORT, ()=>{
            console.log(`The server is up on port ${PORT} `)
        })