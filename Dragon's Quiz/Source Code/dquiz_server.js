var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');
var js = require('jservice-node')
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
	password: 'pianty77y',
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
app.get('/pointsadd', function(req,res){
	var points = req.query.points;
	var user = req.query.user;
	var query = 'UPDATE user SET total_points = total_points + '+points+' WHERE username = '+'"'+user+'"'+';';
	con.query(query,
		function(err, rows, fields){
			if(err){
				console.log(err);
			}
			else{
				res.send("Correct!")
			}
	});
});
app.get('/pointsreduce', function(req,res){
	var points = req.query.points;
	var user = req.query.user;
	var query = 'UPDATE user SET total_points = total_points - '+points+' WHERE username = '+'"'+user+'"'+';';
	con.query(query,
		function(err, rows, fields){
			if(err){
				console.log(err);
			}
			else{
				res.send("Incorrect!")
			}
	});
});
app.post('/login', function(req, res){
	var user = req.body.username;
	var pw = req.body.password1;
	var query = 'SELECT password FROM user WHERE username=\'' + user + '\';';
	//console.log(query);
		con.query(query,
		function(err, rows, fields){
			if(err){
				console.log(err);
			}
			else if(!(rows.length)) {
				res.send("");
			}
			else {
				//console.log(rows);
				var realpw = String(rows[0].password);
				if (pw === realpw) {
					res.send("1");
				}
				else {
					res.send("");
				}
			}
		});
});

app.post('/createuser', function(req, res){
	var name = req.body.username;
	var pw = req.body.password1;
	var query = 'INSERT INTO user\n(username, password, total_points, weekly_points)\nVALUES\n(\'' + name + '\', \'' + pw + '\', \'' + 0 + '\', \'' + 0 + '\');';
	console.log(query);
	var results = [];
	con.query(query,
		function(err, rows, fields){
			if(err){
				console.log(err);
			}
			else {
				//console.log("Success");
				res.send(".");
			}
		});
});

app.get('/qa', function(req,res){
	var cat_id = parseInt(req.query.id);
	js.category(cat_id, function(error, response, json){
		if(!error && response.statusCode == 200){
			output_json = json;
			var randomNumber = Math.floor(Math.random() * parseInt(output_json.clues_count));
			res.send( output_json.clues[randomNumber] );
		} else {
			console.log(`Error: ${response.statusCode}`);
		}
	});
});

app.post('/leaderboard', function(req, res){
	var query = 'SELECT username, total_points FROM user ORDER BY total_points desc LIMIT 10;';
	//console.log(query);
		con.query(query,
		function(err, rows, fields){
			if(err){
				console.log(err);
			}
			else {
				results = [];
				for (i=0; i<rows.length; i++) {
					row = [rows[i].username, rows[i].total_points];
					results.push(row);
				}
				res.send(results);
			}
		});
});
