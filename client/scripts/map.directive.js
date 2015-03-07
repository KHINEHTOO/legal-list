(function(){
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
