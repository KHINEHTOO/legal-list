(function(){
  //all config modules define a state and resolve a service to populate
  //data to named controllers. This config resolves the creation date as
  //well as populating input fields if linking to previous search queries
  angular.module('search.config', [])
    .config(['$stateProvider', function($stateProvider){
      $stateProvider.state('search', {
        url: '/search',
        templateUrl: '../views/search.html',
        controller: 'SearchCtrl',
        resolve: {
          currentDate: ['dateFactory', function(dateFactory){
            return dateFactory.pull().$promise;
          }],
          currentPath: ['$location', function($location){
            var path = $location.$$path.split('/');
            if(path.length > 2 && path[2] !== 'invalid'){
              return path[2];
            }else{
              return '';
            }
          }],
        },
      });
    }]);
})();
