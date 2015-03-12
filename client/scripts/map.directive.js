(function(){
  //this directive ties through attribute $scope.source from search.controller
  //and watches for changes to the source element to populate to the Google maps
  //iframe to re-render for new api calls.
  angular.module('map.directive', [])
    .directive('mapDirective', function(){
      return {
        restrict: 'A',
        replace: true,
        scope: {
          source: '='
        },
        templateUrl: '../views/map.html',
        link: function(scope, elem, attrs){
          scope.$watch('source', function(newVal){
            elem.attr('src', newVal);
          });
        }
      };
    });
})();
