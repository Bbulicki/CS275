var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(8080,function(){
	console.log('Server Started');
});

// Creates connection to database
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'schuetz',
	database: 'cs275_hw5'
});
con.connect(function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log("Database Connected");
	}
});
app.post('/createstudent', function(req, res){
	var name = req.body.name;
	var pw = req.body.pw;
	var query = 'INSERT INTO student\n(id, first, last, birthdate, major)\nVALUES\n(\'' + studentid + '\', \'' + first + '\', \'' + last + '\', \'' + birthdate + '\', \'' + major + '\');';
	console.log(query);
	var results = [];
	con.query(query,
		function(err, rows, fields){
			if(err){
				console.log(err);
			}
			else {
				//console.log("Success");
				res.send("Success. New User Created.");
			}
		});
});