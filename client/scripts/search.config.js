(function(){
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
