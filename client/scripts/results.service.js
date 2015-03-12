(function(){
  //this service calls back-end api to retreive information from user input
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
