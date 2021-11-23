/**
 * Index.js
 * Serves as the main file for our project.
 * Author: Daniel Palmer
 * 2021-11-22
 */
const express = require("express");
const app = express();

var port = 8000;


app.use(express.static("scripts"))
app.use(express.static("views", {"extensions": ["html", "htm"]}))
app.use(express.static("assets"))
app.use(express.static("styles"))

app.listen(port, ()=>{
    console.log(`Server started on port ${port}, url: http://localhost:${port}`)
});

app.get('/register', (req, res)=>{
    res.sendFile("register")
});