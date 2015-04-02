var pdf = require('./pdf2json//lib/pdf.js');
var fs = require('fs');

fs.readFile('input/pdfs/1.pdf', function(err, buffer){
  console.log(buffer);
var doc = new pdf(buffer);
console.log(doc.getRawTextContent());
});