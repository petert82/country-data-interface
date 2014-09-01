angular.module('country-interface', ['ngRoute', 'ci.countries']).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/country/:cca3', {controller: 'CountryDetailController', templateUrl: 'template/countryDetail.html'}).
        when('/search/:search', {controller: 'CountryIndexController', templateUrl: 'template/countryIndex.html'}).
        otherwise({controller: 'CountryIndexController', templateUrl: 'template/countryIndex.html'});
}]);