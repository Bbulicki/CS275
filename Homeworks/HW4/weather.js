//Weather Module

var EventEmitter = require('events').EventEmitter;
var utils = require('util')

function Calc(){
	EventEmitter.call(this);
}
utils.inherits(Calc, EventEmitter);


//Render
Calc.prototype.render = function(){
	var fs = require('fs');
	var html_string = fs.readFileSync('./bjb366_hw2.html','utf8');
	return (html_string);
}


//Key



//Get Zip


//get Weather
