angular.module('events', ['ngRoute', 'ngResource', 'events.controllers', 'events.factories', 'events.services'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeController'
    })
<<<<<<< HEAD
    // .when('', {
    //     templateUrl: 'views/list.html',
    //     controller: 'EventListController'
    // })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeEventController'
    })
    // .when('/:id', {
    //     templateUrl: 'views/single.html',
    //     controller: 'SingleEventController'
    // })
=======
    .when('/events', {
        templateUrl: 'views/list.html',
        controller: 'EventListController'
    })
    // .when('/compose', {
    //     templateUrl: 'views/compose.html',
    //     controller: 'ComposeEventController'
    // })
    .when('/event/:id', {
    templateUrl: 'views/single.html',
     controller: 'SingleEventController'
    })
>>>>>>> ce6e1f636729fa8e2fa70ef10cef3e49aa938075
    .otherwise({
        redirectTo: '/'
    });
}]);