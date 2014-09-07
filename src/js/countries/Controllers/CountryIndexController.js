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
    }]);