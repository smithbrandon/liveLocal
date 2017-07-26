angular.module('events', ['ngRoute', 'ngResource', 'events.controllers', 'events.factories', 'events.services'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeController'
    })
    .when('', {
        templateUrl: 'views/list.html',
        controller: 'EventListController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeEventController'
    })
    .when('/:id', {
        templateUrl: 'views/single.html',
        controller: 'SingleEventController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);