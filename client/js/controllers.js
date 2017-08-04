angular.module('events.controllers', [])
    .controller('EventListController', ['$scope','Category','Event','$http','Geo', function ($scope,Category, Event,$http,Geo) {
        $scope.events = Event.query();
        $scope.cats = Category.query();
        $scope.searchBtn = function(){
            console.log($scope.searchItems);
        }
    }])
    .controller('SingleEventController', ['$scope', '$routeParams', 'Event', function ($scope, $routeParams, Event) {
        $scope.event = Event.get({ id: $routeParams.id },function(){
            $scope.eventArray = [$scope.event];
        });



    }])
    .controller('ComposeEventController', ['$scope','Geo','$location', 'Event','$http','Tag', function ($scope, Geo, $location, Event,$http,Tag) {

        $('#startDate').datetimepicker();
        $('#endDate').datetimepicker();

        $('[data-toggle="popover"]').popover();
        $scope.allTags = {tag: null};
        $scope.tags = Tag.query();
        
        $scope.checkTagLength = function(){
            if($scope.allTags.tag == "" || null){
                $scope.allTags.tag = null;
            }
        }

         function checkAndAdd(tag, arr) {
            for(var i=0;i<arr.length; i++){
                if(arr[i].tag == tag){
                    return arr[i].id;
                }
            }
            return false;
        }

        $scope.badges = [];

        $scope.selectTag = function(tag){
            $scope.allTags = tag;
        }

        $scope.addTag = function(t){
            var tagExists = checkAndAdd($scope.allTags.tag,$scope.tags);
            console.log(tagExists);
            if(!tagExists){
                var newTag = new Tag({tag: $scope.allTags.tag});
                newTag.$save(function(success){
                    $scope.badges.push({id: success.id, tag: success.tag});
                },function(err){
                    console.log(err);  
                });
            }else{
                $scope.badges.push({id: $scope.allTags.id, tag: $scope.allTags.tag});
            }
            $scope.allTags.tag = null;
        }
        $scope.removeTag = function(tag){
            $scope.badges.splice($scope.badges.indexOf(tag),1);
        }

        $scope.save = function () {
            var p = new Event($scope.event);
            $scope.event.startDate = moment($('#startDate').val(),'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
            $scope.event.endDate = moment($('#endDate').val(),'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
            Geo.retrieve($scope.event.address1, $scope.event.city, $scope.event.state)
                .then(function(success){
                    $scope.event.lat = success.lat;
                    $scope.event.lng = success.lng;
                    p.$save(function (success) {
                        id = success.id;
                        for(var i=0;i<$scope.badges.length;i++){
                            Event.tagEvent({id: id, tagId: $scope.badges[i].id})
                        }
                        $location.path('/');
                    }, function (err) {
                        console.log(err);
                    });
                },function(err){

                });
        }
        

    }])
    .controller('UpdateEventController', ['$scope', '$location', '$routeParams', 'Event','Geo', 'Tag',function ($scope, $location, $routeParams, Event, Geo,Tag) {
        $scope.addressChange = false;
        $('#startDate').datetimepicker();
        $('#endDate').datetimepicker();

        $scope.allTags = null;
        
        getTags();
        
        function getTags(){
            $scope.tags = Tag.query();
            Tag.tagsByEvent({eventId: $routeParams.id},function(success){
                $scope.badges = success;
            });
        }
    
        function checkAndAdd(tag, arr) {
            for(var i=0;i<arr.length; i++){
                if(arr[i].tag == tag){
                    return arr[i].id;
                }
            }
            return false;
        }

        $scope.checkTagLength = function(){
            if($scope.allTags.length < 1){
                $scope.allTags = null;
            }
        }

        $scope.removeTag = function(tag){
            Event.untagEvent({eventId: tag.eventId, id: tag.id},function(){
                getTags();
            });
        }
        $scope.selectTag = function(tag){
            $scope.allTags = tag.tag;
        }

        $scope.addTag = function(t){
            //Figure out how to differentiate Capitalization
            var tagExists = checkAndAdd($scope.allTags,$scope.tags);
            if(!tagExists){
                var newTag = new Tag({tag: $scope.allTags});
                newTag.$save(function(success){
                    Event.tagEvent({id: $routeParams.id, tagId: success.id},function(success){
                        getTags();
                    },function(err){
                        console.log(err);
                    })
                },function(err){
                console.log(err);  
                });
            }else{
                var onEvent = checkAndAdd($scope.allTags, $scope.badges);
                if(!onEvent){
                    Event.tagEvent({id: $routeParams.id, tagId: onEvent},function(success){
                        getTags();
                    },function(err){
                        console.log(err);
                    });
                }else{
                    alert('Tag already on event');
                }
            }    
        }

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

    // function redirect() {
    //     var dest = $location.search().dest;
    //     if (!dest) { dest = '/'; }
    //     $location.replace().path(dest).search('dest', null);
    // }

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