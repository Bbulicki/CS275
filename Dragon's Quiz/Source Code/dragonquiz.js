var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var request = require("request");
var fs = require("fs")

var app = express();

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'dragonquiz',

});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("."));
app.listen(8080,function(){
	console.log('Server started...');
});

con.connect(function(err){
	if (err){
		console.log(err.message);
	}
	else{
		console.log("Database successfully connected");
	}
});
app.get('/signup.html', function(req, res){
	console.log("Hi signup")
});
app.get('/finalProject.html', function(req,res){
	console.log('leaderboard');
});

app.post('/login', function(req,res){
	console.log("Hi login");
	var user = req.body.username;
	var pw = req.body.password1;
	console.log("Hi " + user);
	res.send('Hello World');
});