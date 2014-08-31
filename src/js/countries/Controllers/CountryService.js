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
}]);