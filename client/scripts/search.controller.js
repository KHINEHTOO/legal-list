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

