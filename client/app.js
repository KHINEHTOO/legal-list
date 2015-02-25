angular.module('listApp', 
	['ngResource', 'ngRoute'])

  .config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/request-zipcode', {
        templateUrl: 'template.html',
        controller: 'listCtrl',
        resolve: {
          dateFactory: 'dateFactory',
          currentDate: function(dateFactory){
            return dateFactory.pull().$promise;
          }
        },
      })
      .otherwise({
        redirectTo: '/request-zipcode'
      });
  }])
  .factory('dateFactory', ['$resource', function($resource){
    return $resource('/date', {}, {
      pull: {
        method: 'GET',
      }
    });
  }])
	.factory('listFactory', ['$resource', function($resource){
	 return $resource('/request-zipcode/:zip', {}, {
      request: {
        method: 'GET',
        isArray: 'true'
      }
   });
	}])
	.controller('listCtrl', ['$scope', 'listFactory', 'currentDate', function($scope, listFactory, currentDate){
		$scope.date = currentDate.date;
    $scope.loc = '';
    $scope.add = '';
    $scope.city = '';
    $scope.zip = '';
    $scope.greet = listFactory.greet;
    $scope.places = [];
		$scope.noResults = false;
    $scope.validZip = function(){
      if($scope.zip.length === 5){
        var allNums = $scope.zip.split('').every(function(character){
          return isNaN(parseInt(character)) === false;
        });
        if(allNums){
          return true;
        }
      }
      return false;
    };
    $scope.triggerRequest = function(){
        if($scope.validZip()){
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
          $scope.noResults = true;
        }  
    };
      
	}])
  .filter('input', function(){
    return function(string, query){
      if(query.length === 0){
        return string;
      }
      if(string.indexOf(query.toUpperCase()) > -1){
        return  string; 
      }
    };
  });


