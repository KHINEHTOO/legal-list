(function(){
  //front-end routing to re-route unknown routes to /search
  //initializes search state after re-route
  angular.module('app.config', [])
    .config(['$urlRouterProvider', function($urlRouterProvider){
      $urlRouterProvider.otherwise('/search');
    }]);
})();
