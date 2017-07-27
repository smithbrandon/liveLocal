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
    .when('/events/:id', {
        templateUrl: 'views/single.html',
        controller: 'SingleEventController'
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

