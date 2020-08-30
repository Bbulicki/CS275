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
	database: 'dragonquiz'
});
con.connect(function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log("Database Connected");
	}
});

app.post('/logina', function(req, res){
	var user = req.body.username;
	var pw = req.body.pw;
	var query = 'SELECT password FROM users WHERE username=\'' + user + '\';';
	//console.log(query);
		con.query(query,
		function(err, rows, fields){
			if(err){
				console.log('Error');
			}
			else {
				//console.log(rows);
				var realpw = rows[0].password;
				//console.log(realpw);
				if (pw == realpw) {
					res.send("Login Success.");
				}
				else {
					res.send("Login Failed.");
				}
			}
		});
});

