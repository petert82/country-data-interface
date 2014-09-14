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
                get('/data/countries.json', {cache: true}).
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
         * @param  {string}  cca3 Alpha-3 country code.
         * @return {Promise}      Resolves to data for a single country.
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
        },
        /**
         * Gets GeoJSON data for the given country.
         * @param  {string}  cca3 Alpha-3 country code.
         * @return {Promise}      Resolves to GeoJSON object.
         */
        findGeoData: function(cca3) {
            var deferred = $q.defer();
            
            // Checks we have some geometery available, assumes the top-level object is a 
            // FeatureCollection
            var hasGeometry = function(data) {
                if (typeof data.features === 'undefined') {
                    return false;
                }
                
                if (!data.features.length) {
                    return false;
                }
                
                if (typeof data.features[0].geometry === 'undefined') {
                    return false;
                }
                
                return true;
            };
            
            cca3 = cca3.toLowerCase();
            
            $http.
                get('/data/geo/'+cca3+'.geo.json', {cache: true}).
                success(function(data) {
                    deferred.resolve(hasGeometry(data) ? data : null);
                }).
                error(function(data) {
                    deferred.resolve(null);
                });
            
            return deferred.promise;
        }
    };
}]);