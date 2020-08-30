
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('.'));

//Connect to mySQL
var mysql = require('mysql');
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '6000908Bb*',
	database: 'hw5'
});

con.connect(function(err){
	if(err){
		console.log('Cannot connect to database');
		console.log(err);
	}
	else{
		console.log('Connected to database');
	}
});

app.get("/table", function(req,res){
	var tableName = req.query.t;
	
	con.query('SELECT * FROM hw5.' + tableName, function (err, rows, fields){
		if(err){
			console.log('Error During Query Processing');
			res.send('Error During Query Processing');
		} 
		else{
			var htmlStr = '<table><tr>'; //This will be sent to client
			
			//Column Header Title
			var head = [];
			for(i=0; i<fields.length; i++){
				head.push(fields[i].name);
				htmlStr += '<th>' + fields[i].name + '</th>';
			}
			htmlStr += '</tr>'
			
			//Data
			for(i=0; i<rows.length; i++){
				htmlStr += '<tr>';
				for(x=0; x<head.length; x++){
					htmlStr += '<td>' + rows[i][head[x]] + '</td>';
				}
				htmlStr += '</tr>';
			}
			
			htmlStr += '</table>'
			
			//Send to Client
			res.send(htmlStr);
		}
	});
});


app.get('/transcripts', function (req,res){
	con.query('SELECT studentID, fName, lName FROM student ORDER BY lName;', function(err,rows,fields){
		if(err){
			console.log('Error During Query Processing');
			res.send('Error During Query Processing');
		}
		else{
			//HtmlStr will be sent to client
			var htmlStr = "<h2>Display a Student Transcript from Database</h2>" + 
				"<p>To display the desired student's transcript, select the name of the student and a term/year, then click 'Display Transcript'</p>" +
				"<select id='s_opts'>";
						
			//Dropdown for Students
			for(i=0; i<rows.length; i++){
				htmlStr += '<option value="' + rows[i].studentID + '">' + rows[i].lName + ', ' + rows[i].fName + '</option>';
			}
			htmlStr += '</select>';
			
			//Dropdown for Term
			con.query('SELECT term FROM grades;', function(err,rows,fields){
				if(err){
					console.log('Error During Query Processing');
					res.send('Error During Query Processing');
				}
				else{
					htmlStr += '<select id="t_opts"><option value="all">All</option>';
					for(i=0; i<rows.length; i++){
						htmlStr += '<option value="' + rows[i].TERM + '">' + rows[i].TERM + '</option>';
					}
					
					htmlStr += "</select>" +
						"<input type='button' onclick='getTranscript()' value='Display Transcript'>" +
						"<br>"+
						"<div id='out'></div>";
					console.log('Rendering transcript display page');
					res.send(htmlStr);
				}
			});
		}
	});
});

app.get('/getTranscript', function (req,res){
	
	//get student id and term from json in url data
	var stud_id = req.query.s;
	var terms = req.query.t;
	console.log('Processing request for student ID=' + stud_id);
	
	if(term == "all"){
		//show all terms for student
		var q_str = 'SELECT student.STUDENT_ID AS "Student ID", NAME_FIRST AS "First Name", NAME_LAST AS "Last Name", TERM AS "Term/Year", course.COURSE_ID AS "Course ID", COURSE_DESC AS "Description", GRADE AS "Grade" FROM course, grades, student WHERE student.STUDENT_ID = grades.STUDENT_ID AND course.COURSE_ID = grades.COURSE_ID AND student.STUDENT_ID = ' + stud_id + ';';
	}
	else{
		//show specific term for student
		var q_str = 'SELECT student.STUDENT_ID AS "Student ID", NAME_FIRST AS "First Name", NAME_LAST AS "Last Name", TERM AS "Term/Year", course.COURSE_ID AS "Course ID", COURSE_DESC AS "Description", GRADE AS "Grade" FROM course, grades, student WHERE student.STUDENT_ID = grades.STUDENT_ID AND course.COURSE_ID = grades.COURSE_ID AND student.STUDENT_ID = ' + stud_id + ' AND TERM = "' + terms + '";';
	}
	
	con.query(q_str, function(err,rows,fields){
		if(err){
			console.log('Error During Query Processing');
			res.send('Error During Query Processing');
		}
		else{
			//htmlStr will be sent to client
			var htmlStr = '<table border="1"><tr>';
			
			//Column Titles
			var head = [];
			for(i=0; i<fields.length; i++){
				head.push(fields[i].name);
				htmlStr += '<th>' + fields[i].name + '</th>';
			}
			htmlStr += '</tr>';
			
			//Data
			for(i=0; i<rows.length; i++){
				htmlStr += '<tr>';
				for(x=0; j<head.length; x++){
					htmlStr += '<td>' + rows[i][headers[x]] + '</td>';
				}
				htmlStr += '</tr>';
			}
			
			htmlStr += '</table>'
			
			//Send to client
			res.send(htmlStr);
		}
	});
});


//Any other URL request will redirect to the main page
app.get('*',function (req, res) {
	res.redirect('./bjb366_hw5.html');
});

//Have the server listen to port 8080
app.listen(8080,function(){
	console.log('Server Running');
});