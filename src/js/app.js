angular.module('country-interface', ['ngRoute', 'ci.common', 'ci.countries', 'ci.maps']).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/about', {
            templateUrl: 'template/about.html',
            title: 'About'
        }).
        when('/country/:cca3', {
            controller: 'CountryDetailController',
            templateUrl: 'template/countryDetail.html'
        }).
        when('/search/:search', {
            controller: 'CountryIndexController',
            templateUrl: 'template/countryIndex.html',
            title: 'Search'
        }).
        otherwise({
            controller: 'CountryIndexController',
            templateUrl: 'template/countryIndex.html'
        });
}]).
run(['$rootScope', '$location', 'AnalyticsService', function($rootScope, $location, AnalyticsService) {
    var defaultTitle = 'Countries of the World';
    
    // Enable changing the page title
    $rootScope.page = {
        setTitle: function(title) {
            this.title = title + ' | ' + defaultTitle;
        }
    };
    
    // Set page title and report to Google Analytics when route changes
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        var title = defaultTitle;
        
        if (angular.isDefined(current.$$route) && angular.isDefined(current.$$route.title)) {
            title = current.$$route.title;
        }
        
        $rootScope.page.setTitle(title);
        
        AnalyticsService.track($location.path());
    });
}]);