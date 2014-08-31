angular.module('ci.countries.controllers').
controller('CountryController', ['$scope', 'CountryService', function($scope, CountryService) {
    
    $scope.index = function(searchTerm) {
        $scope.countries = [];
        $scope.searchTerm = searchTerm;
        
        CountryService.query().then(function(list) {
            $scope.countries = list;
        });
    };
}]);