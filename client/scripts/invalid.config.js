(function(){
  angular.module('invalid.config', [])
    .config(['$stateProvider', function($stateProvider){
      $stateProvider.state('search.invalid', {
        url: '/invalid',
        template: '<h3 class="text-center">Invalid Input: <small>Zip Code Invalid or Not Found</small></h3>',  
      });
  }]);
})();
  