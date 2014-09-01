angular.module('ci.countries.controllers').
controller('CountryDetailController', ['$scope', '$routeParams', 'CountryService', function($scope, $routeParams, CountryService) {
    $scope.country = {};
    
    CountryService.find($routeParams.cca3).then(function(country) {
        $scope.country = country;
    });
}]);