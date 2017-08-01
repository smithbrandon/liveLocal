angular.module('events.controllers', [])
    .controller('EventListController', ['$scope', 'Event','$http', function ($scope, Event,$http) {
        $scope.events = Event.query(function(success){
            var p = Promise.resolve();
            for (let i =0;i<success.length;i++){
                p = p.then(function() {
                    return getLatLng(success[i].address1,success[i].city,success[i].state)
                    .then(function(latLng) {
                        $scope.events[i].coord = latLng;
                    });
                });
            }
            p = p.then(function() {
                $scope.initialize();
            });
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
                console.log($scope.events[i]);
                var lat = $scope.events[i].coord.lat;
                var lng = $scope.events[i].coord.lng;
                addMarker(lat, lng, map);
            }
        }

        function addMarker(lat, lng, map) {
            console.log('adding pin');
            console.log(lat, lng);
            var latLng = new google.maps.LatLng(lat, lng);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
        }

        // function getLatLng(address, city, state, zip){
        //     var addressSan = address.replace(' ','+');
        //     var citySan = city.replace(' ','+');
        //     var coord = {};
        //     return $http({
        //         method: 'GET',
        //         url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressSan +',+' + citySan + ',+' + state + '&key=AIzaSyBPb-IgcKTbo1DIl8oe9i0-6aptQ2BZCUI'
        //     }).then(function(success){
        //         coord.lat = success.data.results[0].geometry.location.lat;
        //         coord.lng = success.data.results[0].geometry.location.lng;
        //         return coord;
        //     },function(err){
        //         console.log(err);
        //     });
        // }

    }])
    .controller('SingleEventController', ['$scope', '$routeParams', 'Event', function ($scope, $routeParams, Event) {
        $scope.event = Event.get({ id: $routeParams.id });



    }])
    .controller('ComposeEventController', ['$scope', '$location', 'Event','$http', function ($scope, $location, Event,$http) {
        $('#startDate').datetimepicker();
        $('#endDate').datetimepicker();

        $('[data-toggle="popover"]').popover();

        $scope.save = function () {
            var p = new Event($scope.event);
            $scope.event.startDate = moment($('#startDate').val(),'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
            $scope.event.endDate = moment($('#endDate').val(),'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
            var coords = getLatLng($scope.event.address1, $scope.event.city, $scope.event.state)
                .then(function(success){
                    console.log(success);
                    $scope.event.lat = success.lat;
                    $scope.event.lng = success.lng;
                    console.log($scope.event.startDate);
                    console.log($scope.event.endDate);
                    p.$save(function () {
                        $location.path('/');
                    }, function (err) {
                        console.log(err);
                    });
                },function(err){

                });
        }

        function getLatLng(address, city, state){
            var addressSan = address.replace(' ','+');
            var citySan = city.replace(' ','+');
            var coord = {};
            return $http({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressSan +',+' + citySan + ',+' + state + '&key=AIzaSyBPb-IgcKTbo1DIl8oe9i0-6aptQ2BZCUI'
            }).then(function(success){
                coord.lat = success.data.results[0].geometry.location.lat;
                coord.lng = success.data.results[0].geometry.location.lng;
                return coord;
            },function(err){
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
    .controller('navbar', ['$scope', function($scope) {
        $('.nav li').on('click', function(){
            $('.nav li').removeClass("active");
            $(this).addClass('active');
        });
    }]);