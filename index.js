/**
 * Index.js
 * Serves as the main file for our project.
 * Author: Daniel Palmer
 * 2021-11-22
 */
const express = require("express");
const app = express();

var port = 8000;

app.use(express.urlencoded({extended: true}))

app.use(express.static("scripts"))
app.use(express.static("views", {"extensions": ["html", "htm"]}))
app.use(express.static("assets"))
app.use(express.static("styles"))

app.set("view engine", "ejs")

app.listen(port, ()=>{
    console.log(`Server started on port ${port}, url: http://localhost:${port}`)
});

app.get('/', (req, res)=>{
    res.render('index')
});

app.get('/register', (req, res)=>{
    res.render("register")
});

app.get('/contact', (req, res)=>{
    res.render("contact")
});

app.get('/packages', (req, res)=>{
    res.render('packages')
});