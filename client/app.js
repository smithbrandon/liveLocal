angular.module('events', ['ngRoute', 'ngResource', 'events.controllers', 'events.factories', 'events.services'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/list.html',
        controller: 'EventListController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeEventController'
    })
    .when('/events/:id/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdateEventController'
    })
    .when('/events/:id', {
        templateUrl: 'views/single.html',
        controller: 'SingleEventController'
    })
    .when('/map',{
        templateUrl: 'views/map.html',
        controller: 'mapController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]).filter('yesNo',function(){
    return function(num){
        if(isNaN(num) || num < 0){
            return 'err';
        }else{
            if(num === 0){
                return 'NO';
            }else{
                return 'YES';
            }
        }
    }
});

