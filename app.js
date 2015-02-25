var fs = require('fs');
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/client');
app.set('port', (process.env.PORT || 4000));

app.get('/', function(req, res){
  res.render('index.html');
  res.end();
});

app.get('/request-zipcode/:zip', function(req, res){
	console.log('request');
	var path = req.originalUrl.split('/');
	var param = path[path.length-1];
	var fileName = param + '.json';
	fs.readdir('data/', function(err, data){
		if(err){
			console.log('error');
			throw err;
		}
		if(data.indexOf(fileName) > -1){
			fs.readFile('data/' + fileName, function(err, data){
				if(err){
					throw err;
				}
				res.end(data);
			});
		}else{
			res.end(JSON.stringify(['invalid']));
		}
	});
});


app.listen(app.get('port'), function(){
  console.log("listening:" + app.get('port'));
  
}); 