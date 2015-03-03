(function(){
  angular.module('results.config', [])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $stateProvider.state('search.results', {
        url: '/:zip',
        templateUrl: '../views/results.html',
        controller: 'resultsCtrl',
        resolve: {
          data: ['resultsFactory', '$stateParams', '$state', function(resultsFactory, $stateParams, $state){
            return resultsFactory.request({'zip': $stateParams.zip}).$promise.then(function(data){
              if(data[0] === 'invalid'){
                //redirect state
                $state.go('search.invalid');
              }else{
                return data;
              }
            });
          }]
        },
      });
    }]);
})();
  