//Caculator Module

var EventEmitter = require('events').EventEmitter;
var utils = require('util')

function Calc(){
	EventEmitter.call(this);
}
utils.inherits(Calc, EventEmitter);


//Render
Calc.prototype.render = function(){
	var fs = require('fs');
	var html_string = fs.readFileSync('./bjb366_hw3.html','utf8');
	return (html_string);
}

//Compute Factorial

Calc.prototype.fact = function(n){
	var answerF = 1;

	for(i=1; i<=n; i++){
		answerF *= i;
	}
	
	return(answerF.toString());
}
	

//Compute Summation

Calc.prototype.sum = function(n){
	var answerS = 0;
	
	for(i=0; i<=n; i++){
		answerS = answerS + i;
	}
	
	return(answerS.toString());
}

//Export
module.exports = Calc;