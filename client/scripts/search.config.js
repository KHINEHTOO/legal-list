(function(){
  angular.module('search.config', [])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $stateProvider.state('search', {
        url: '/search',
        templateUrl: '../views/search.html',
        controller: 'searchCtrl',
        resolve: {
          dateFactory: 'dateFactory',
          currentDate: function(dateFactory){
            return dateFactory.pull().$promise;
          }
        },
      });
    }]);
})();
