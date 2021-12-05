/**
 * addpassworld.js
 * This page is solely for testing/database modification, and will not be in the final 
 * Author: Daniel Palmer
 * CPRG 207 - Threaded Project
 * 2021-11-30
 */

const mysql = require("mysql")

//this page is solely for testing/database modification, and will not be in the final

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "travelexperts"
});

function signOn(email, password){
    con.connect((err)=>{
        if (err) throw err;
        var sql = `SELECT password FROM customers WHERE CustEmail="${email}"`
        con.query(sql, (err, results)=>{
            if (err) throw err;
            if (password == results[0].password){
                console.log("Log in successfull")
            }else{
                console.log("Email and/or password are incorrect")
            }
            
        });
        con.end()
    })
}

signOn("daniel.palmer@shaw.ca", "testword")