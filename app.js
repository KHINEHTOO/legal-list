var fs = require('fs');
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
//set static directory for all style script and template files
app.use(express.static(__dirname + '/client'));
app.engine('html', ejs.renderFile);
app.set('views', __dirname + '/client');
app.set('port', (process.env.PORT || 4000));

//root url, serve up index file which resolves all dependencies via CDN and instantiates angular modules
app.get('/', function(req, res){
  res.render('index.html');
  res.end();
});

//apis for retreiving search data and to populate creation date for search template
app.get('/date', function(req, res){
	fs.readFile('data/date.json', function(err, data){
		var current = JSON.parse(data);
		res.end(JSON.stringify({'date': current}));
	});
});

app.get('/request-zipcode/:zip', function(req, res){
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
