angular.module('country-interface', ['ci.countries']);;
angular.module('ci.countries',['ci.countries.controllers',
                               'ci.countries.directives',
                               'ci.countries.filters',
                               'ci.countries.services']);

// Init sub-modules
angular.module('ci.countries.controllers',[]);
angular.module('ci.countries.directives',[]);
angular.module('ci.countries.filters',[]);
angular.module('ci.countries.services',[]);;
angular.module('ci.countries.controllers').
controller('CountryController', ['$scope', 'CountryService', function($scope, CountryService) {
    
    $scope.index = function(searchTerm) {
        $scope.countries = [];
        $scope.searchTerm = searchTerm;
        
        CountryService.query().then(function(list) {
            $scope.countries = list;
        });
    };
}]);;
angular.module('ci.countries.services').
factory('CountryService', ['$http', '$q', function($http, $q) {
    return {
        query: function() {
            var deferred = $q.defer();
            
            $http.
                get('/js/countries.json').
                success(function(data) {
                    deferred.resolve(data);
                }).
                error(function(data) {
                    deferred.resolve([]);
                });
            
            return deferred.promise;
        }
    };
}]);;
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
}]);;
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
            
            if (matches(country.name)) {
                filtered.push(country);
            } else if (matches(country.nativeName)) {
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