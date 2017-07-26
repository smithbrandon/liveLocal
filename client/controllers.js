angular.module('events.controllers', [])
// .controller('WelcomeController', ['$scope', function($scope) {

// }])
.controller('EventListController', ['$scope', 'Event', function($scope, Event) {
    $scope.events = Event.query();
}])
.controller('SingleEventController', ['$scope', '$routeParams', 'Event', function($scope, $routeParams, Event) {
    $scope.event = Event.get({ id: $routeParams.id });

}])

// .controller('ComposeEventController', ['$scope', '$location', function($scope, $location) {

// }])
