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
    .controller('UpdateEventController', ['$scope', '$location', '$routeParams', 'Event', function ($scope, $location, $routeParams, Event) {

        $('#startDate').datetimepicker();
        $('#endDate').datetimepicker();

    Event.get({id: $routeParams.id}, function(success) {
        $scope.event = success;
        // $scope.event.startDate = toJsFormat(success.startDate);
        // console.log($scope.event.startDate);
    })

    $scope.save = function() {
        $scope.event.startDate = new Date($('#startDate').val()).toMysqlFormat();
        console.log($scope.event.startDate)
        $scope.event.$update(function() {
            $location.replace().path('/' + $routeParams.id);
        })
    }

    function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

    // function toJsFormat(date){
    //     return new Date(Date.parse(date.replace('-','/','g')));
    //     // var dateParts = date.split("-");
    //     // return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
    // }

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
