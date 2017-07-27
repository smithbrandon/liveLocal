angular.module('events.controllers', [])
    .controller('EventListController', ['$scope', 'Event', function ($scope, Event) {
        $scope.events = Event.query();

        $scope.initialize = function () {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: new google.maps.LatLng(35.032616, -85.314063),
                mapTypeId: 'terrain'
            });
            var results = [[35.032616, -85.314063],[35.037261,-85.306198]];

            for (var i = 0; i < results.length; i++) {
                var coords = results[i];
                var latLng = new google.maps.LatLng(coords[0], coords[1]);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
            }
        }
        google.maps.event.addDomListener(window, 'load', $scope.initialize);

    }])
    .controller('SingleEventController', ['$scope', '$routeParams', 'Event', function ($scope, $routeParams, Event) {
        $scope.event = Event.get({ id: $routeParams.id });

    }])
    .controller('ComposeEventController', ['$scope', '$location', 'Event', function ($scope, $location, Event) {

        $('[data-toggle="popover"]').popover();

        $scope.save = function () {
            var p = new Event($scope.event);
            p.$save(function () {
                $location.path('/');
            }, function (err) {
                console.log(err);
            });
        }

    }])
    .controller('mapController', ['$scope', function ($scope) {

        $scope.initialize = function () {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: new google.maps.LatLng(35.032616, -85.314063),
                mapTypeId: 'terrain'
            });
            var results = [[35.032616, -85.314063],[35.037261,-85.306198]];

            for (var i = 0; i < results.length; i++) {
                var coords = results[i];
                var latLng = new google.maps.LatLng(coords[0], coords[1]);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
            }
        }
        google.maps.event.addDomListener(window, 'load', $scope.initialize);

    }]);