var fs = require('fs');


var JSONparser = {
	parse: function(){

// var properties = [
// 	'Location', 
// 	'Address', 
// 	'City', 
// 	'State', 
// 	'Zip',
// ];
var properties = {};
var locationsByZip = {};
var location = {
	'Location': '',
	'Address': '',
	'City': '',
	'State': '',
	'Zip': '',
};

//sync
var directoryFiles = fs.readdirSync('input/json_files');
directoryFiles.forEach(function(file){
	var data = fs.readFileSync('input/json_files/' + file);
	var obj = JSON.parse(data);
	obj.formImage.Pages.forEach(function(page){
		var foundLocation = false;
		var foundZip = false;
		page.Texts.forEach(function(text, i){
			text.R.forEach(function(string){
				if(foundLocation){
					properties[text.x] = string.T;
				}
				if(foundZip){
					var prop = properties[text.x];
					location[prop] = decodeURI(string.T.split('%23').join('#').split('%26').join('&'));
					// .split('%20').join(' ').split('%26').join('&');
					if(prop === 'Zip'){
						// if(Object.keys(location).length < 5){
						// 	properties.forEach(function(position){
						// 		if(location[position] === undefined){
						// 			location[position] = ' ';
						// 		}
						// 	});
						// }
						var clone = {};
						for(var key in location){
							clone[key] = location[key];
							location[key] = '';
						}
						if(locationsByZip[clone.Zip] === undefined){
							locationsByZip[clone.Zip] = [];
						}
						locationsByZip[clone.Zip].push(clone);
					}
				}
				if(string.T === 'Location'){
					foundLocation = true;
					properties[text.x] = string.T;
				}
				if(string.T === 'Zip'){
					foundZip = true;
					foundLocation = false;
				}
			});
		});
	});
});

for(var prop in locationsByZip){
	(function(property){
		fs.writeFile('data/' + property + '.json' , JSON.stringify(locationsByZip[property]), function(err){
			console.log('saved: ' + property);
		});
	})(prop);
}
// var JSONdata = JSON.stringify(locationsByZip);
// fs.writeFile('legal_list.json', JSONdata, function(err){
// 	if(err){
// 		throw err;
// 	}
// 	console.log('retail list saved!');
// });

// fs.readdir('output', function(err, directoryFiles){
// 	directoryFiles.forEach(function(file){
// 		fileCount++;
// 		fs.readFile('output/' + file, function(err, data){
//   			var obj = JSON.parse(data);
//   			obj.formImage.Pages.forEach(function(page){
//   				var foundZip = false;
//   				page.Texts.forEach(function(text, i){
//   					text.R.forEach(function(string){
//   						if(foundZip){
//   			  				var prop = properties[i%5];
//   			  				location[prop] = string.T.split('%20').join(' ').split('%26').join('&');
//   			  				if(prop === 'zip'){
//   			  					var clone = {};
//   			  					for(var key in location){
//   			  						clone[key] = location[key];
//   			  					}
//   			  					locations.push(clone);
//   			  				}
//   						}
//   						if(string.T === 'Zip'){
//   							foundZip = true;
//   						}
//   						if(fileCount === directoryFiles.length){
//   							console.log(locations);
//   						}
//   					});
//   				});
//   			});
// 		});
// 	});
// });


	}
};

module.exports = JSONparser;
