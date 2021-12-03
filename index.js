/**
 * Index.js
 * Serves as the main file for our project.
 * Author: Daniel Palmer
 * Co-author: Justin Molnar
 * Co-author: Marat Nikitin
 * CPRG 207 - Threaded Project
 * 2021-11-22
 */

const express = require("express");
const app = express();
const mysql = require("mysql");
const dateFormatting= require("./scripts/dateFormatting");

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
		user: "group5",
		password: "pass",
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

app.get('/thankyou', (req, res)=>{
    res.render("thankyou")
});
/*
app.get('/customerhome', (req, res)=>{
    res.render("customerhome")
});
*/

//Serves the login page when accessing customerhome, and orders pages.
//Pulls the data  
app.post('/login', (req, res)=>{
    const con = mysql.createConnection({
        host: "localhost",
		user: "group5",
		password: "pass",
		database: "travelexperts"
    });
    if (req.query.path == "/customerhome"){
        con.connect((err)=>{
            if (err) throw err;
            var checkPassword = `SELECT password, CustomerId FROM customers WHERE CustEmail="${req.body.username}"`
            con.query(checkPassword, (err, results)=>{
                if (err) throw err;
                if (req.body.password == results[0].password){
                    var customerQuery = `SELECT * FROM customers WHERE CustomerId="${results[0].CustomerId}"`
                    con.query(customerQuery, (err, results)=>{
                        if (err) throw err;
                        delete results[0].password
                        var customerOrders = `SELECT * FROM bookings WHERE CustomerId="${results[0].CustomerId}"`
                        var customerData = results;
                        con.query(customerOrders, (err, results)=>{
                            if (err) throw err;
                            console.log(results)
                            res.render("customerhome", {customer: customerData[0], orders: results})
                            con.end((err)=>{
                                if (err) throw err;
                            });
                        });
                    });
                }else{
                    res.send('<script>alert("Username and/or password are incorrect!"); window.location.href = "/login"; </script>');
                }
            });
        });
    }else if(req.query.path =="/order"){
        con.connect((err)=>{
            if (err) throw err;
            var checkPassword = `SELECT password, CustomerId FROM customers WHERE CustEmail="${req.body.username}"`
            con.query(checkPassword, (err, results)=>{
                if (err) throw err;
                if (req.body.password == results[0].password){
                    var customerQuery = `SELECT * FROM customers WHERE CustomerId="${results[0].CustomerId}"`
                    con.query(customerQuery, (err, results)=>{
                        if (err) throw err;
                        delete results[0].password
                        var customerOrders = `SELECT * FROM bookings WHERE CustomerId="${results[0].CustomerId}"`
                        var customerData = results;
                        con.query(customerOrders, (err, results)=>{
                            if (err) throw err;
                            console.log(results)
                            res.render("order")
                            con.end((err)=>{
                                if (err) throw err;
                            });
                        });
                    });
                }else{
                    res.send('<script>alert("Username and/or password are incorrect!"); window.location.href = "/login"; </script>');
                }
            });
        });
    };
});

app.post('/thankyou', (req, res)=>{
    const con = mysql.createConnection({
        host: "localhost",
		user: "group5",
		password: "pass",
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

/* This block below was created by Marat Nikitin*/
/*  data for /getpackages is retrieved from the database using an sql query:*/
app.get("/getpackages", (req, res)=>{
    var getConnection = ()=>{
        return mysql.createConnection({
            host: "localhost",
            user: "group5",
            password: "pass", /* Need to make sure that this user with precisely this password is authorised at phpMyAdmin */
            database: "travelexperts"
        });
    };

    var conn = getConnection();
    conn.connect((err)=>{
        if (err) throw err;
        
        var sql = "SELECT PkgName, PkgStartDate, PkgEndDate, PkgDesc, PkgBasePrice FROM packages";
        /* This query ensures that that first & last columns (Package ID & Agency's Commission) are not displayed on the Packages page.
            Normally, travel agencies do not disclose their commission openly and hide it inside the package's total price. */ 
        conn.query(sql, (err, results, fields)=>{
            if (err) throw err;
            results.forEach((result) => {
                result.PkgStartDate = dateFormatting.dateFormatting(result.PkgStartDate); 
                result.PkgEndDate = dateFormatting.dateFormatting(result.PkgEndDate); 
            });
            res.render("packagesmysql", { result: results }); 
            /* packagesmysql.ejs file is used to display the information 
               about packages comprehensively */
            conn.end((err)=>{
                if (err) throw err;
            });
        });
    });
});

app.get('/customerhome', (req, res)=>{
    var pathRequested = encodeURIComponent(`${req.url}`);
    res.redirect('/login?path=' + pathRequested)
});

app.get('/order', (req, res)=>{
    var pathRequested = encodeURIComponent(`${req.url}`);
    res.redirect('/?ploginath=' + pathRequested)
})


app.use((req, res)=>{
    res.status(404).render("404")
});
