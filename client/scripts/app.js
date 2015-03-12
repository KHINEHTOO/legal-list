(function(){
  //all angular modules are written in IIFEs to protect global namespace.
  //all controllers, services, and config files written in seperate modules.
  //this helps in bug hunting and limiting overall complexity to individual modules. 
  angular.module('listApp', [
    'ngResource', 
    'ui.router',
    'app.config', 
    'search.config',
    'date.service',
    'search.controller',
    'map.directive',
    'results.config',
    'results.service',
    'results.controller',
    'invalid.config'
    ]);
})();
