app.post('/leaderboard', function(req, res){
	var query = 'SELECT username, points FROM users ORDER BY points desc LIMIT 10;';
	//console.log(query);
		con.query(query,
		function(err, rows, fields){
			if(err){
				console.log('Error');
			}
			else {
				results = [];
				for (i=0; i<rows.length; i++) {
					row = [rows[i].username, rows[i].points];
					results.push(row);
				}
				res.send(results);
			}
		});
});