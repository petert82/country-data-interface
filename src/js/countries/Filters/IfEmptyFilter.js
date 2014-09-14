angular.module('ci.countries.filters').
filter('ifEmpty', [function() {
    return function(input, alt) {
        if (typeof input === 'undefined') {
            return alt;
        }
        
        if (!input.length) {
            return alt;
        }
        
        return input;
    };
}]);