(function(){
  //this service retrieves date that files were updated via back-end api
  angular.module('date.service', [])
    .factory('dateFactory', ['$resource', function($resource){
      return $resource('/date', {}, {
        pull: {
          method: 'GET',
        }
      });
  }]);
})();
