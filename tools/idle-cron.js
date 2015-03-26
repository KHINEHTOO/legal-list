var crontab = require('node-crontab');
var request = require('request');

var preventIdle = crontab.scheduleJob('*/10 * * * *', function(){
  request('http://www.mikeaxtman.com', function(err, response, body){
    if(err){
      console.log('cron error: ', err);
    }
    console.log('response');
  });
});
