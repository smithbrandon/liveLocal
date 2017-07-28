angular.module('events.controllers', [])
    .controller('EventListController', ['$scope', 'Event','$http', function ($scope, Event,$http) {
        $scope.events = Event.query(function(success){
            for (var i =0;i<success.length;i++){
                $scope.events[i].coord = getLatLng(success[i].address1,success[i].city,success[i].state);
            }
            $scope.initialize();
        });

        $scope.initialize = function () {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: new google.maps.LatLng(35.032616, -85.314063),
                mapTypeId: 'terrain',
                disableDefaultUI: true,
                // draggable: false,
                fullscreenControl: false,
                zoomControl: false,
                zoomControlOptions: false
                // scrollwheel: false

            });

            for (var i = 0; i < $scope.events.length; i++) {
                var lat = $scope.events[i].coord.lat;
                var lng = $scope.events[i].coord.lng;
                console.log($scope.events[i].coord);
                var latLng = new google.maps.LatLng(lat, lng);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
            }
        }

        function getLatLng(address, city, state, zip){
            var addressSan = address.replace(' ','+');
            var citySan = city.replace(' ','+');
            var coord = {};
            $http({
                mehtod: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressSan +',+' + citySan + ',+' + state + '&key=AIzaSyBPb-IgcKTbo1DIl8oe9i0-6aptQ2BZCUI'
            }).then(function(success){
                coord.lat = success.data.results[0].geometry.location.lat;
                coord.lng = success.data.results[0].geometry.location.lng;
            },function(err){
                console.log(err);
            })
            return coord;
        }

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
            $scope.event.startDate = moment(moment.utc(success.startDate).toDate()).format('MM/DD/YYYY hh:mm A');
            $scope.event.endDate = moment(moment.utc(success.endDate).toDate()).format('MM/DD/YYYY hh:mm A');
        })

        $scope.save = function() {
            $scope.event.startDate = moment($('#startDate').val(),'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
            $scope.event.endDate = moment($('#endDate').val(),'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');

            $scope.event.$update(function() {
                $location.replace().path('/' + $routeParams.id);
            })
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
