angular.module('app.config', [])
  .config(['$urlRouterProvider', function($urlRouterProvider){
    $urlRouterProvider.otherwise('/search');
  }]);
