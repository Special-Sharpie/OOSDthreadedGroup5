const express = require("express");
const app = express();

var port = 8000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}, url: http://localhost:8000/${port}`)
});