angular.module('ci.countries.services').
factory('CountryService', ['$http', '$q', function($http, $q) {
    return {
        /**
         * Gets a list of all countries.
         * @return {Promise}
         */
        query: function() {
            var deferred = $q.defer();
            
            $http.
                get('/js/countries.json', {cache: true}).
                success(function(data) {
                    deferred.resolve(data);
                }).
                error(function(data) {
                    deferred.resolve([]);
                });
            
            return deferred.promise;
        },
        /**
         * Gets information for a single country.
         * @param  {string}  cca3 Alpha-3 country code
         * @return {Promise}
         */
        find: function(cca3) {
            var deferred = $q.defer();
            
            cca3 = cca3.toUpperCase();
            
            this.query().then(function(list) {
                angular.forEach(list, function(country) {
                    if (cca3 === country.cca3) {
                        deferred.resolve(country);
                    }
                });
                
                deferred.resolve({});
            });
            
            return deferred.promise;
        }
    };
}]);