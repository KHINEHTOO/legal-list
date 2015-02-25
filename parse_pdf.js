var exec = require('child_process').exec;
var fs = require('fs');
var JSONParser = require('./parse_json.js');
var files = fs.readdirSync('input/pdfs');
var count = 0;
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

