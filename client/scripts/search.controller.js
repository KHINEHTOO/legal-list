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
