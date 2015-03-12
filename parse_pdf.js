var exec = require('child_process').exec;
var fs = require('fs');
var JSONParser = require('./parse_json.js');
var files = fs.readdirSync('input/pdfs');
var count = 0;
//module for running a shell script that parses all pdf files in a directory
//of the same format into json then runs the JSONparser module when complete. 
files.forEach(function(fileName, i){
  exec('cd node_modules/pdf2json  && node pdf2json.js -f ../../input/pdfs/'+ fileName +' -o ../../input/json_files', function(error, stdout, stderr){
    console.log('stdout ' + stdout);
    console.log('stderr ' + stderr);
    count++;
    if(count === files.length){
      JSONParser.parse();   
    }
    if(error){
      console.log('error ' + error);
    }
  });
});

