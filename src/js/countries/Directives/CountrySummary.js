angular.module('ci.countries.directives').
directive('countrySummary', [function() {
    return {
        link: function($scope, $element, $attrs) {
            
        },
        restrict: 'E',
        scope: {
            country: '='
        },
        templateUrl: '/template/countrySummaryDirective.html'
    };
}]);