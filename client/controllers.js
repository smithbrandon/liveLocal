angular.module('events.controllers', [])
// .controller('WelcomeController', ['$scope', function($scope) {

// }])
.controller('EventListController', ['$scope', 'Event', function($scope, Event) {
    $scope.events = Event.query();
}])
.controller('SingleEventController', ['$scope', '$routeParams', 'Event', function($scope, $routeParams, Event) {
    $scope.event = Event.get({ id: $routeParams.id });

}])

<<<<<<< HEAD
// }])
.controller('ComposeEventController', ['$scope', '$location', 'Event', function($scope, $location, Event) {
    
    $('[data-toggle="popover"]').popover();
=======
// .controller('ComposeEventController', ['$scope', '$location', function($scope, $location) {
>>>>>>> ce6e1f636729fa8e2fa70ef10cef3e49aa938075

    $scope.save = function() {
        var p = new Event($scope.event);
        p.$save(function() {
            $location.path('/');
        }, function(err) {
            console.log(err);
        });
    }

}])
