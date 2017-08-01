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
                    $scope.event.lat = success.lat;
                    $scope.event.lng = success.lng;
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
                p = Geo.retrieve($scope.event.address1, $scope.event.city, $scope.event.state)
                .then(function(success){
                    $scope.event.lat = success.lat;
                    $scope.event.lng = success.lng;
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

    }])
    .controller('navbar', ['$scope', function($scope) {
        $('.nav li').on('click', function(){
            $('.nav li').removeClass("active");
            $(this).addClass('active');
        })
    }])
    .controller('adminController',['$scope','$http',function($scope, $http){
        $('#myTabs a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        });

        var userId = 1;
        $http({
            method: 'GET',
            url: '/api/events/' + userId
        }).then(function(success){
            $scope.events = success.data;
            // for(var i = 0;i<success.data.length;i++){
                // $scope.events[0].interested = getInterested(success.data[0]);
                // $scope.events[0].going = getGoing(success.data[0]);
            // }
            console.log($scope.events);
        },function(err){
            console.log(err);
        })

        // function getInterested(id){
        //     return $http({
        //         method: 'GET',
        //         url: '/api/events/'+id+'/interested'
        //     }).then(function(success){
        //         console.log(success.data);
        //     },function(err){
        //         console.log(err);
        //     })
        // }

        // function getGoing(id){
        //     return $http({
        //         method: 'GET',
        //         url: '/api/events' + id + '/going'
        //     }).then(function(success){
        //         console.log(success.data);
        //     },function(err){
        //         console.log(err);
        //     })
        // }
    }]);