angular.module('country-interface', ['ngRoute', 'ci.countries', 'ci.maps']).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/country/:cca3', {controller: 'CountryDetailController', templateUrl: 'template/countryDetail.html'}).
        when('/search/:search', {controller: 'CountryIndexController', templateUrl: 'template/countryIndex.html'}).
        otherwise({controller: 'CountryIndexController', templateUrl: 'template/countryIndex.html'});
}]);;
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
controller('CountryDetailController', ['$scope', '$routeParams', 'CountryService', function($scope, $routeParams, CountryService) {
    $scope.country = {};
    $scope.geoData = null;
    $scope.shouldShowTranslations = false;
    
    // Load the country data
    CountryService.find($routeParams.cca3).then(function(country) {
        $scope.country = country;
        $scope.country.osmUrl = getOsmUrl();
    });
    
    // Load the country's GeoJSON data
    CountryService.findGeoData($routeParams.cca3).then(function(geoData) {
        $scope.geoData = geoData;
    });
    
    /**
     * Display/hide translations of the country's name.
     */
    $scope.toggleTranslations = function() {
        $scope.shouldShowTranslations = !$scope.shouldShowTranslations;
    };
    
    /**
     * Gets an Openstreetmap URL for the current country.
     * @return {string} URL to the current country's lat/long
     */
    var getOsmUrl = function() {
        var lat = $scope.country.latlng[0],
        lng = $scope.country.latlng[1],
        zoomLevel = 5;
        
        return "http://www.openstreetmap.org/#map=5/"+lat+"/"+lng;
    };
}]);;
angular.module('ci.countries.controllers').
controller('CountryIndexController', ['$scope', '$location', '$routeParams', 'CountryService', 
    function($scope, $location, $routeParams, CountryService) {
        $scope.countries = [];
        
        if ($routeParams.search) {
            $scope.searchTerm = $routeParams.search;
        } else {
            $scope.searchTerm = '';
        }
        
        CountryService.query().then(function(list) {
            $scope.countries = list;
        });
        
        $scope.showDetail = function(country) {
            $location.path('/country/'+country.cca3);
        };
    }]);;
angular.module('ci.countries.directives').
directive('countrySummary', [function() {
    return {
        link: function($scope, $element, $attrs) {
            
        },
        restrict: 'E',
        scope: {
            country: '=',
            select: '&onSelect'
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
});;
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
            
            cca3 = cca3.toLowerCase();
            
            $http.
                get('/data/geo/'+cca3+'.geo.json', {cache: true}).
                success(function(data) {
                    deferred.resolve(data);
                }).
                error(function(data) {
                    deferred.resolve(null);
                });
            
            return deferred.promise;
        }
    };
}]);;
angular.module('ci.maps',['ci.maps.directives',
                          'ci.maps.services']);

// Init sub-modules
angular.module('ci.maps.directives',[]);
angular.module('ci.maps.services',[]);;
angular.module('ci.countries.directives').
/**
 * Displays a map centered on a given point and optionally including a GeoJSON
 * layer.
 */
directive('mapView', ['$timeout', 'LeafletService', function($timeout, L) {
    /**
     * Add a GeoJSON layer to the given map.
     * @param {Map}    map     A leaflet map.
     * @param {Object} geoJson GeoJSON data.
     */
    var addGeoJsonLayer = function(map, geoJson) {
        var geoLayer;
        
        if (!map || !geoJson) {
            return null;
        }
        
        // GeoJSON layer
        geoLayer = L.geoJson().addTo(map);
        geoLayer.addData(geoJson);
        
        return geoLayer;
    };
    
    return {
        link: function(scope, element, attrs) {
            var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                map;
            
            // Basic map setup
            map = L.map('map-view').setView([scope.center[0], scope.center[1]], 3);
            L.tileLayer(osmUrl, {
                attribution: attrib,
                maxZoom: 18
            }).addTo(map);
            
            // Add GeoJSON, data when available
            scope.$watch('geoJson', function(geoJson) {
                var geoLayer = addGeoJsonLayer(map, geoJson);
                
                // Zoom to fit country in view
                if (geoLayer) {
                    map.fitBounds(geoLayer.getBounds());
                }
            });
        },
        restrict: 'E',
        scope: {
            center: '=',
            geoJson: '='
        },
        templateUrl: '/template/mapViewDirective.html'
    };
}]);;
angular.module('ci.maps.services').
factory('LeafletService', ['$window', function($window) {
    return $window.L;
}]);