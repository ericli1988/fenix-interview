const express = require('express')
const app = express()
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//connect mysql
var connection = mysql.createConnection({
  host     : 'example.org',
  user     : 'bob',
  password : 'secret',
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//start angular application
app.get('/', function(req, res) {
	res.sendfile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/core.js', function(req, res) {
	res.sendfile('core.js'); 
});

//mysql
app.post('/api/mysql', function(req, res) {
	console.log("mysql called");
	try{req.body = JSON.parse(Object.keys(req.body)[0])}catch(err){req.body = req.body}
	var query = connection.query('INSERT INTO posts SET ?', req.body, function(err, result) {
	  // Neat!
	});
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
	
});




app.listen(3000, () => console.log('Example app listening on port 3000!'))