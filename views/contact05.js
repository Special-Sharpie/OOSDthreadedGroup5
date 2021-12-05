const express=require("express");
const app=express();
const fs= require("fs");
const mysql=require("mysql");

app.set("view engine", "ejs");

app.listen(8000,(err)=>{
        if(err)throw err;
        console.log("server started");
});

app.get("/getagents",(req,res)=>{
    var conn=getConnection();
    conn.connect((err)=>{
        if (err) throw err;
        
        var sql="select agents.agtFirstName, agents.agtLastName, agents.agtBusPhone, agents.AgtEmail from agents";                       //fetching data brom db
        conn.query(sql,(err,result)=>{
            if(err)throw err;

            res.render("contact05",{result: result});
            conn.end((err)=>{
                if (err) throw err;
            });

        });

    });
});


var getConnection=()=>{
    return mysql.createConnection({
        host:"localhost",
        user:"shifa",
        password:"password",
        database: "travelexperts"
   });
}
