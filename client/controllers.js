angular.module('events.controllers', [])
// .controller('WelcomeController', ['$scope', function($scope) {

// }])
// .controller('EventListController', ['$scope', function($scope) {

// }])
// .controller('SingleEventController', ['$scope', '$routeParams', function($scope, $routeParams) {

// }])
.controller('ComposeEventController', ['$scope', '$location', 'Event', function($scope, $location, Event) {
    
    $('[data-toggle="popover"]').popover();

    $scope.save = function() {
        var p = new Event($scope.event);
        p.$save(function() {
            $location.path('/');
        }, function(err) {
            console.log(err);
        });
    }

}])
