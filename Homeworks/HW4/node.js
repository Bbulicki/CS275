
var express = require('express');
var app = express();
var http = require('http')
app.use(express.static("."));

//Show server is on
app.listen(8080, function (){
	console.log ('Node server is running...');
});

//Require Caculator 
var Calculator = require('./calculator');
var c = new Calculator();

//Call Request to Render
app.get('/renCalc', function(req, res){
	var html_string = c.render();
	console.log("Rendering Calc");
	res.send(html_string);
})

//Factorial Request
app.get('/fact', function(req, res){
		var seed = req.query.n;
		var fact_resp = c.fact(seed);
		console.log('Factorial Request');
		res.send(fact_resp);
});

//Summation Request
app.get('/sum', function(req, res){
		var seed = req.query.n;
		var fact_resp = c.sum(seed);
		console.log('Summation Request');
		res.send(fact_resp);
});

//Require Caculator 
var weather = require('./weather');
var w = new Calculator();

//Call Request to Render
app.get('/renWeather', function(req, res){
	var html_string = w.render();
	console.log("Rendering Weather");
	res.send(html_string);
})
