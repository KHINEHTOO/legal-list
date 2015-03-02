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
