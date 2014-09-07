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
}]);