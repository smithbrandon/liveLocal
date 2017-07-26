angular.module('events.controllers', [])
// .controller('WelcomeController', ['$scope', function($scope) {

// }])
.controller('EventListController', ['$scope', 'Event', function($scope, Event) {
    $scope.events = Event.query();
}])
// .controller('SingleEventController', ['$scope', '$routeParams', function($scope, $routeParams) {

// }])
// .controller('ComposeEventController', ['$scope', '$location', function($scope, $location) {

// }])
