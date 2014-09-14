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
        
        /**
         * Show the detail view for the given country.
         * @param  {Object} country Country to show detail for.
         */
        $scope.showDetail = function(country) {
            $location.path('/country/'+country.cca3);
        };
    }]);