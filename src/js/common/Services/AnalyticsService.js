/**
 * A service for interacting with Google Analytics.
 */
angular.module('ci.common.services').
factory('AnalyticsService', ['$window', function($window) {
    return {
        /**
         * Track a pageview with Google Analytics
         * @param  {string} path URL path
         */
        track: function(path) {
            if (path === '') {
                path = '/';
            }
            
            $window.ga(function() {
                $window.ga('send', 'pageview', {
                    page: path
                    // 'title': 'my overridden page'
                });
            });
            
        }
    };
}]);