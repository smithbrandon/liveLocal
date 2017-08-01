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

    .controller('LoginController', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {
    UserService.me().then(function() {
        redirect();
    });
    
    
    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            redirect();
        }, function(err) {
            console.log(err);
        });
    }

    function redirect() {
        var dest = $location.search().dest;
        if (!dest) { dest = '/'; }
        $location.replace().path(dest).search('dest', null);
    }

}])
// .controller('UserListController', ['$scope', 'User', 'UserService' function($scope, User, UserService) {
//  UserService.requireLogin();   
// $scope.users = User.query();

//     $scope.createUser = function() {
//         var u = new User($scope.newUser);
//         u.$save(function() {
//             $scope.newUser = {};
//             $scope.users = User.query();
//         });
//     }
// }])

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