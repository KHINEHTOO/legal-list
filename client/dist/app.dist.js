(function(){
  angular.module('app.config', [])
    .config(['$urlRouterProvider', function($urlRouterProvider){
      $urlRouterProvider.otherwise('/search');
    }]);
})();

(function(){
  angular.module('listApp', [
    'ngResource', 
    'ui.router',
    'app.config', 
    'search.config',
    'search.controller',
    'map.directive',
    'date.service',
    'results.config',
    'results.service',
    'results.controller',
    'invalid.config'
    ]);
})();

(function(){
  angular.module('date.service', [])
    .factory('dateFactory', ['$resource', function($resource){
      return $resource('/date', {}, {
        pull: {
          method: 'GET',
        }
      });
  }]);
})();

(function(){
  angular.module('invalid.config', [])
    .config(['$stateProvider', function($stateProvider){
      $stateProvider.state('search.invalid', {
        url: '/invalid',
        template: '<h3 class="text-center">Invalid Input: <small>Zip Code Invalid or Not Found</small></h3>',  
      });
  }]);
})();
  
(function(){
  angular.module('map.directive', [])
    .directive('mapDirective', function(){
      return {
        restrict: 'A',
        replace: true,
        scope: {
          source: '='
        },
        templateUrl: '../views/map.html',
        link: function(scope, elem, attrs){
          scope.$watch('source', function(newVal){
            elem.attr('src', newVal);
          });
        }
      };
    });
})();

(function(){
  angular.module('results.config', [])
    .config(['$stateProvider', function($stateProvider){
      $stateProvider.state('search.results', {
        url: '/:zip',
        templateUrl: '../views/results.html',
        controller: 'ResultsCtrl',
        resolve: {
          data: ['resultsFactory', '$stateParams', '$state', function(resultsFactory, $stateParams, $state){
            return resultsFactory.request({'zip': $stateParams.zip}).$promise.then(function(data){
              if(data[0] === 'invalid'){
                //redirect state
                $state.go('search.invalid');
              }else{
                return data;
              }
            });
          }]
        },
      });
    }]);
})();
  
(function(){
  angular.module('results.controller', [])
    .controller('ResultsCtrl', [ '$scope', 'data', function($scope, data){
      $scope.places = data;
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
})();

(function(){
  angular.module('results.service', [])
    .factory('resultsFactory', ['$resource', function($resource){
      return $resource('/request-zipcode/:zip', {}, {
        request:{
          method: 'GET',
          isArray: true
        }
      });
  }]);
})();

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

(function(){
  angular.module('search.controller', [])
    .controller('SearchCtrl',['$scope', 'currentDate', '$state', 'currentPath', '$window', function($scope, currentDate, $state, currentPath, $window){
      $scope.geoLocation = null;
      $scope.date = currentDate.date;
      $scope.input = currentPath;
      $scope.key = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCLbJZTkY_NirgVBPImmLX3ValZ9t2u1xw&q=';
      $scope.src = '';
      $scope.triggerRequest = function(input){
        if($scope.validZip(input)){
          $state.go('search.results', {
            'zip': input
          });    
        }else{
          $scope.input = '';
          $state.go('search.invalid');
        }  
      };
      $scope.validZip = function(value){
        if(value){
          return value.split('').every(function(character){
            return isNaN(parseInt(character)) === false;
          });
        }
        return false;
      };
      if(!$scope.geoLocation){
        $window.navigator.geolocation.getCurrentPosition(function(position){
          $scope.$apply(function(){
            $scope.geoLocation = {
              lat : position.coords.latitude,
              long : position.coords.longitude
            };  
          });
        });
      }
      $scope.apiUrlGenerator = function(){
        var validInput = $scope.validZip($scope.input);
        if($scope.geoLocation && !validInput){
          $scope.src = $scope.key + $scope.geoLocation.lat + ',' + $scope.geoLocation.long;
        }else if(validInput){
          $scope.src = $scope.key + $scope.input;
        }else{
          $scope.src = '';
        }
      };
      $scope.$watchGroup(['geoLocation','input'], function(){
        $scope.apiUrlGenerator();
      });
    }]);  
})();
