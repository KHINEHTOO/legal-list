angular.module('app.config', [])
  .config(['$urlRouterProvider', function($urlRouterProvider){
    $urlRouterProvider.otherwise('/search');
  }]);

angular.module('listApp', [
	'ngResource', 
	'ui.router',
	'app.config', 
	'search.config',
	'search.controller',
	'date.service'
	]);

angular.module('date.service', [])
  .factory('dateFactory', ['$resource', function($resource){
    return $resource('/date', {}, {
      pull: {
        method: 'GET',
      }
    });
  }]);

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


(function(){
  angular.module('search.controller', [])
    .controller('searchCtrl',['$scope', 'currentDate', function($scope, currentDate){
      $scope.date = currentDate.date;
      $scope.input ='';
      $scope.triggerRequest = function(input){
          if(validZip(input)){
            $scope.places = [];
            $scope.noResults = false;
            var response = listFactory.request({zip: $scope.zip});
            response.$promise.then(function(data){
              if(data[0] === 'invalid'){
                $scope.noResults = true;
              }else{
                $scope.places = data;
              }
            });  
          }else{
            console.log('nested state');
            // $scope.noResults = true;
            //redirect to another state
          }  
      };
    }]);
      
      var validZip = function(value){
        if(value.length === 5){
          var allNums = value.split('').every(function(character){
            return isNaN(parseInt(character)) === false;
          });
          if(allNums){
            return true;
          }
        }
        return false;
      };
})();