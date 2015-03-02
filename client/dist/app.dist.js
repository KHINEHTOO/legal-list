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
  angular.module('results.config', [])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $stateProvider.state('search.results', {
        url: '/:zip',
        templateUrl: '../views/results.html',
        controller: 'resultsCtrl',
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
    .controller('resultsCtrl', [ '$scope', 'data', function($scope, data){
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

(function(){
  angular.module('search.controller', [])
    .controller('searchCtrl',['$scope', 'currentDate', '$state', function($scope, currentDate, $state){
      $scope.date = currentDate.date;
      $scope.input ='';
      $scope.triggerRequest = function(input){
          if(validZip(input)){
            $state.go('search.results', {
              'zip': input
            });    
          }else{
            $state.go('search.invalid');
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
