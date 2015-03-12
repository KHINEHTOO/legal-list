(function(){
  //state is so small it does not need a controller or seperate template file.
  //notifies the user when they have entered an invalid or unknown search query.
  angular.module('invalid.config', [])
    .config(['$stateProvider', function($stateProvider){
      $stateProvider.state('search.invalid', {
        url: '/invalid',
        template: '<h3 class="text-center">Invalid Input: <small>Zip Code Invalid or Not Found</small></h3>',  
      });
  }]);
})();
  