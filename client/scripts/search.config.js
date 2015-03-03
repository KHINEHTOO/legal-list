(function(){
  angular.module('search.config', [])
    .config(['$stateProvider', function($stateProvider){
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
