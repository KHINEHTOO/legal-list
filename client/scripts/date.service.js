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
