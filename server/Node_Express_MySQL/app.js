// load our app server using express
const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const morgan = require("morgan")

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const route = require('./routes/user')
app.use(route)



app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOT")
})

app.listen(3003, () => {
    console.log("Server is listening in port 3003. Nice!")
})