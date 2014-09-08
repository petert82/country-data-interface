angular.module('country-interface', ['ngRoute', 'ci.countries', 'ci.maps']).

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
run(['$rootScope', function($rootScope) {
    var defaultTitle = 'Countries of the World';
    
    // Enable changing the page title
    $rootScope.page = {
        setTitle: function(title) {
            this.title = title + ' | ' + defaultTitle;
        }
    };
    
    // Set page title when route changes
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        var title = defaultTitle;
        
        if (angular.isDefined(current.$$route) && angular.isDefined(current.$$route.title)) {
            title = current.$$route.title;
        }
        
        $rootScope.page.setTitle(title);
    });
}]);