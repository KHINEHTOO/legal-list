(function(){
  //populates data into $scope to be displayed in a table for viewing
  //the filter is set up to filter based on user parameters in input boxes
  //above each table column.
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
