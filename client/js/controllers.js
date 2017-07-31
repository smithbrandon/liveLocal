angular.module('events.controllers', [])
    .controller('EventListController', ['$scope', 'Event','$http','Geo', function ($scope, Event,$http,Geo) {
        $scope.events = Event.query();

    }])
    .controller('SingleEventController', ['$scope', '$routeParams', 'Event', function ($scope, $routeParams, Event) {
        $scope.event = Event.get({ id: $routeParams.id },function(){
            $scope.eventArray = [$scope.event];
        });



    }])
    .controller('ComposeEventController', ['$scope','Geo','$location', 'Event','$http', function ($scope, Geo, $location, Event,$http) {
        $('#startDate').datetimepicker();
        $('#endDate').datetimepicker();

        $('[data-toggle="popover"]').popover();

        $scope.save = function () {
            var p = new Event($scope.event);
            $scope.event.startDate = moment($('#startDate').val(),'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
            $scope.event.endDate = moment($('#endDate').val(),'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
            Geo.retrieve($scope.event.address1, $scope.event.city, $scope.event.state)
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

    }])
    .controller('UpdateEventController', ['$scope', '$location', '$routeParams', 'Event','Geo', function ($scope, $location, $routeParams, Event, Geo) {
        $scope.addressChange = false;
        $('#startDate').datetimepicker();
        $('#endDate').datetimepicker();

        Event.get({id: $routeParams.id}, function(success) {
            $scope.event = success;
            $scope.event.startDate = moment(moment.utc(success.startDate).toDate()).format('MM/DD/YYYY hh:mm A');
            $scope.event.endDate = moment(moment.utc(success.endDate).toDate()).format('MM/DD/YYYY hh:mm A');
        })

        $scope.save = function() {
            var p = Promise.resolve();
            if($scope.addressChange === true){
                console.log('Change Ran');
                p = Geo.retrieve($scope.event.address1, $scope.event.city, $scope.event.state)
                .then(function(success){
                    $scope.event.lat = success.lat;
                    $scope.event.lng = success.lng;
                    console.log($scope.event.lat);
                    console.log($scope.event.lng);
                })
            }
            p.then(function(){
                $scope.event.startDate = moment($('#startDate').val(),'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
                $scope.event.endDate = moment($('#endDate').val(),'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
                $scope.event.$update(function() {
                    $location.replace().path('/' + $routeParams.id);
                })
            })

        }

    }]);