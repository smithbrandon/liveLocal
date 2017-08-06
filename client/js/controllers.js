angular.module('events.controllers', [])
    .controller('EventListController', ['$scope','Category','Event','$http','Geo','Category', function ($scope,Category, Event,$http,Geo,Category) {
        $scope.events = Event.query();
        $scope.cats = Category.query();
        $scope.searchBtn = function(){
            console.log($scope.searchItems);
        }
        $('#startDate').datetimepicker();
        $('#endDate').datetimepicker();

    }])
    .controller('SingleEventController', ['$scope', '$routeParams', 'Event','Tag', function ($scope, $routeParams, Event, Tag) {
        $scope.event = Event.get({ id: $routeParams.id },function(){
            $scope.eventArray = [$scope.event];
            Tag.tagsByEvent({eventId: $routeParams.id},function(success){
                $scope.event.tags = success;
            });
        });


    }])
    .controller('ComposeEventController', ['$scope','$q','Geo','$location', 'Event','$http','Tag','Category', function ($scope, $q, Geo, $location, Event,$http,Tag,Category) {
        
        var startDate = '';
        var endDate = '';

        $('#startDate').datetimepicker().on('dp.change',function(el){
            startDate = moment(el.date._d,'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
        });
        $('#endDate').datetimepicker().on('dp.change',function(el){
            endDate = moment(el.date._d,'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
        });

        $('[data-toggle="popover"]').popover();
        $scope.allTags = {tag: null};
        $scope.tags = Tag.query();
        
        $scope.categories = Category.query();

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
            p.startDate = startDate;
            p.endDate = endDate;
            Geo.retrieve($scope.event.address1, $scope.event.city, $scope.event.state)
            .then(function(success){
                console.log(success.lat);
                p.lat = success.lat;
                p.lng = success.lng;
                console.log(p);
                p.$save(function (success) {
                    id = success.id;
                    for(var i=0;i<$scope.badges.length;i++){
                        Event.tagEvent({id: id, tagId: $scope.badges[i].id})
                    }
                    $location.path('/');
                }, function (err) {
                    console.log(err);
                });
            },function(err){})
        }
    }])
    .controller('UpdateEventController', ['$scope', '$location', '$routeParams', 'Event','Geo', 'Tag','Category',function ($scope, $location, $routeParams, Event, Geo,Tag,Category) {
        $scope.addressChange = false;
        var startDate = '';
        var endDate = '';

        $scope.categories = Category.query();        
        Event.get({id: $routeParams.id}, function(success) {
            $scope.event = success;
            startDate = moment(moment.utc(success.startDate).toDate()).format('MM/DD/YYYY hh:mm A');
            endDate = moment(moment.utc(success.endDate).toDate()).format('MM/DD/YYYY hh:mm A');
            console.log(endDate)
            $('#startDate').datetimepicker({
                date: startDate,
                format: 'MM/DD/YYYY hh:mm A'
            }).on('dp.change',function(el){
                startDate = el.date._d;
            });
            $('#endDate').datetimepicker({
                date: endDate,
                format: 'MM/DD/YYYY hh:mm A'
            }).on('dp.change',function(el){
                endDate = el.date._d;
            });
        })

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
                $scope.event.startDate = moment(startDate,'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
                $scope.event.endDate = moment(endDate,'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD HH:mm:ss');
                console.log($scope.event.startDate);
                console.log($scope.event.endDate);
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