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
