angular.module('ci.maps.services').
factory('LeafletService', ['$window', function($window) {
    return $window.L;
}]);