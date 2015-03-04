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
      var allNums = value.split('').every(function(character){
        return isNaN(parseInt(character)) === false;
      });
      if(allNums){
        return true;
      }
      return false;
    };
})();
