angular.module('ci.countries.filters').
filter('search', function() {
    return function(input, search) {
        var filtered = [];
        
        search = search.toUpperCase();
        
        var matches = function(value) {
            return value.toUpperCase().substring(0, search.length) === search;
        };
        
        var listMatches = function(list) {
            var found = false;
            
            angular.forEach(list, function(value) {
                if(matches(value)) {
                    found = true;
                }
            });
            
            return found;
        };
        
        angular.forEach(input, function(country) {
            
            if (matches(country.name.common)) {
                filtered.push(country);
            } else if (matches(country.name.native.common)) {
                filtered.push(country);
            } else if (search.length <= 2 && matches(country.cca2)) {
                filtered.push(country);
            } else if (search.length <= 3 && matches(country.cca3)) {
                filtered.push(country);
            } else if (search.length <= 3 && listMatches(country.currency)) {
                filtered.push(country);
            } else if (listMatches(country.translations)) {
                filtered.push(country);
            }
        });
        
        return filtered;
    };
});