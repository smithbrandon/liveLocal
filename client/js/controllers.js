angular.module('events.controllers', [])
    .controller('EventListController', ['$scope', 'Event','$http','Geo', function ($scope, Event,$http,Geo) {
        $scope.events = Event.query();

    }])
    .controller('SingleEventController', ['$scope', '$routeParams', 'Event', function ($scope, $routeParams, Event) {
        $scope.event = Event.get({ id: $routeParams.id },function(){
            $scope.eventArray = [$scope.event];
        });



    }])
    .controller('ComposeEventController', ['$scope','Geo','$location', 'Event','$http','Tag', function ($scope, Geo, $location, Event,$http,Tag) {
        $scope.allTags = null;
        $('#startDate').datetimepicker();
        $('#endDate').datetimepicker();

        $('[data-toggle="popover"]').popover();
        $scope.tags = Tag.query();
        
        $scope.checkTagLength = function(){
            if($scope.allTags.length < 1){
                $scope.allTags = null;
            }
        }

        $scope.badges = [];

        $scope.selectTag = function(tag){
            $scope.allTags = tag.tag;
        }
        $scope.addTag = function(t){
            $scope.badges.push($scope.allTags);
            console.log($scope.badges);
        }

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
    .controller('adminController',['$scope','$http','Event',function($scope, $http, Event){
        $('#myTabs a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
        });

        var userId = 1;
        Event.getEventsByUser({userId: userId},function(success){
            $scope.events = success;
            console.log(success);
        },function(err){
            console.log(err);
        });

        $scope.cancelEvent = function(event){
            event.status = 0;
            event.$update({id: event.id});
        }
        $http({
            method: 'GET',
            url: '/api/events/interests/' + userId
        }).then(function(success){
            $scope.interests = success.data;
            console.log($scope.interests);
        },function(err){
            console.log(err);
        })
    }]);