(function(){
  angular.module('listApp', [
    'ngResource', 
    'ui.router',
    'app.config', 
    'search.config',
    'search.controller',
    'date.service',
    'results.config',
    'results.service',
    'results.controller',
    'invalid.config'
  ]);
})();
