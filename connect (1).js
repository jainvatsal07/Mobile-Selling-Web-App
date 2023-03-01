const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const session = require('express-session');
const port = 3000;
const app = express();
const bodyParser = require("body-parser");

// create a database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mydatabase'
});

// connect to the database
// connection.connect();

// set up the view engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("/public"));
// // set up the session middleware
app.use(session({
  secret: 'mysecretkey',
  resave: true,
  saveUninitialized: true
}));

// // set up the routes
// app.get('/mobiles', (req, res) => {
//   // query the database to get the list of mobiles
//   const sql = 'SELECT * FROM mobiles';
//   connection.query(sql, (error, results, fields) => {
//     if (error) throw error;

//     // render the mobile list page and pass in the mobiles data
//     res.render('mobiles', { mobiles: results });
//   });
// });

app.get("/", function(req, res) {
    // if(req.session.loggedIn==true) res.redirect('/mobiles');
    res.render('Login');
})

app.get('/login', (req, res) => {
  // render the login page
  res.render('login');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // query the database to check if the user exists
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(sql, [username, password], (error, results, fields) => {
    if (error) throw error;

    if (results.length > 0) {
      // set the session variable to indicate that the user is logged in
      req.session.loggedIn = true;

      // redirect the user to the mobile list page
      res.redirect('/');
    } else {
      // render the login page with an error message
      res.render('login', { error: 'Invalid username or password' });
    }
  });
});

app.get('/logout', (req, res) => {
  // destroy the session to log the user out
  req.session.destroy();

  // redirect the user to the login page
  res.redirect('/login');
});

app.get('/contact', (req, res) => {
  // render the contact page
  res.render('contact');
});

// start the server
app.listen(port, function() {
    console.log("Server started on port.");
    console.log(`Example app listening at http://localhost:${port}`);
});
