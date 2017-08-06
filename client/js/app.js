angular.module('events', ['ngRoute', 'ngResource', 'events.controllers', 'events.factories', 'events.services',,'events.directives','angular-flexslider'])
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
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/events/:id/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdateEventController'
    })
    .when('/events/:id', {
        templateUrl: 'views/single.html',
        controller: 'SingleEventController'
    })
    .when('/admin',{
        templateUrl: 'views/admin.html',
        controller: 'adminController'
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
                // return 'NO';
                return 'times';
            }else{
                // return 'YES';
                return 'check';
            }
        }
    }
});

