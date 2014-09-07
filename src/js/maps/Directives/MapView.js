angular.module('ci.countries.directives').
directive('mapView', ['$timeout', 'LeafletService', function($timeout, L) {
    return {
        link: function(scope, element, attrs) {
            var map;
            
            $timeout(function() {
                var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    attrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
                
                map = L.map('map-view').setView([scope.center[0], scope.center[1]], 3);
                
                L.tileLayer(osmUrl, {
                    attribution: attrib,
                    maxZoom: 18
                }).addTo(map);
            });
        },
        restrict: 'E',
        scope: {
            center: '='
        },
        templateUrl: '/template/mapViewDirective.html'
    };
}]);