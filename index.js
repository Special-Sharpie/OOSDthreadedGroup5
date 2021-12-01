/**
 * Index.js
 * Serves as the main file for our project.
 * Author: Daniel Palmer
 * CPRG 207 - Threaded Project
 * 2021-11-22
 */

const express = require("express");
const app = express();
const mysql = require("mysql");

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
    const con = mysql.createConnection({
        host: "localhost",
		user: "justin",
		password: "password",
		database: "travelexperts"
    });
    //Pulls the Agent name data from the database, then passes it down to the register page
    var agentNameQuery = "SELECT AgtFirstName, AgtLastName FROM agents"
    con.query(agentNameQuery, (err, results, fields)=>{
        if (err) throw err;
        res.render("register", {agents : results});
    });
    con.end()
});

app.get('/contact', (req, res)=>{
    res.render("contact")
});

app.get('/packages', (req, res)=>{
    res.render('packages')
});

app.get('/login', (req, res)=>{
    res.render("login")
});

app.post('/login', (req, res)=>{
    const con = mysql.createConnection({
        host: "localhost",
		user: "Daniel",
		password: "pass",
		database: "travelexperts"
    });
    con.connect((err)=>{
        if (err) throw err;
        var checkPassword = `SELECT password, CustomerId FROM customers WHERE CustEmail="${req.body.username}"`
        con.query(checkPassword, (err, results)=>{
            if (req.body.password == results[0].password){
                var customerQuery = `SELECT * FROM customers WHERE CustomerId="${results[0].CustomerId}"`
                con.query(customerQuery, (err, results)=>{
                    delete results[0].password
                    res.render("customerhome", {customer: results[0]})
                });

            }else{
                res.send('<script>alert("Username and/or password are incorrect!"); window.location.href = "/login"; </script>');
            }
            con.end((err)=>{
                if (err) throw err;
            })
        });
    });
});

app.post('/thankyou', (req, res)=>{
    const con = mysql.createConnection({
        host: "localhost",
		user: "justin",
		password: "password",
		database: "travelexperts"
    });
    // The following code is used to verify that the email being
    // registered with has not been used in the with another account.
    con.connect((err)=>{
        if (err) throw err;
        // Attempts to pull the account that the requested email is linked to.
        // If the email query returns an empty array, the registration will proceed
        // If the email query returns an array with data, it alerts the user that
        // the email is already registered
        var emailQuery = `SELECT * FROM customers WHERE CustEmail="${req.body.email}"`
        con.query(emailQuery, (err, results)=>{
            if (err) throw err;
            if (results.length != 0){
                res.send('<script>alert("That email is already in use on this site!"); window.location.href = "/register"; </script>');
                return false;
            }else{
                var nameArray = req.body.agent.split(" ")
                // A database query to pull the ID of the agent that was selected in the registration page.
                // Filters by the first and last name
                var agentIdQuery = `SELECT AgentId FROM agents where AgtfirstName="${nameArray[0]}" and AgtLastName="${nameArray[1]}"`
                con.query(agentIdQuery, (err, results)=>{
                    if (err) throw err;
                    var agent = results[0].AgentId;
                    //Inserts the provided customer information into the Travel Experts database
                    var insertCustomer = "INSERT INTO customers (CustFirstName, CustLastName, CustAddress,"
                    + " CustCity, CustProv, CustPostal, CustCountry, CustHomePhone, CustBusPhone, CustEmail, AgentId, password)"
                    + " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    con.query(
                        insertCustomer, 
                        [
                            req.body.fname, req.body.lname, req.body.address, req.body.city, req.body.province, req.body.postalcode,
                            req.body.country, req.body.phonenumber, req.body.phonenumber, req.body.email, agent, req.body.password
                        ], 
                        (err, results, field)=>{
                        if(err) throw err;
                        res.render("thankyou")
                        con.end((err)=>{
                            if (err) throw err;
                        });
                    });
                });
            };
        });
    });
});