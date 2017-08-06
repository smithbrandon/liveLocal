angular.module('events', ['ngRoute', 'ngResource', 'events.controllers', 'events.factories', 'events.services',,'events.directives','angular-flexslider'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/list.html',
        controller: 'EventListController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeEventController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/events/:id/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdateEventController'
    })
    .when('/events/:id', {
        templateUrl: 'views/single.html',
        controller: 'SingleEventController'
    })
    .when('/admin',{
        templateUrl: 'views/admin.html',
        controller: 'adminController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]).filter('yesNo',function(){
    return function(num){
        if(isNaN(num) || num < 0){
            return 'err';
        }else{
            if(num === 0){
                return 'times';
            }else{
                return 'check';
            }
        }
    }
}).filter('searchFilter',function(){
    return function(event, criteria){
        
        if(!criteria){
            return event;
        }
        
        return event.filter(function(el, i, arr){
            if(criteria.tags){
                for(var i=0;i<criteria.tags.length;i++){
                    var searchTag = criteria.tags[i].id;
                    var eventTags = el.tags.map(function(item){return item.id});
                    var matching = eventTags.some(function(el,i,arr){
                        return  el === searchTag;
                    });
                    if(!matching){
                        return false;
                    }
                }
            }
            
            
            if(criteria.catId != undefined){
                if(el.catId !== criteria.catId){
                    return false;
                }
            }

            if(criteria.startDate != undefined && criteria.endDate != undefined){
                var startRange = moment(el.startDate).isBetween(criteria.startDate, criteria.endDate);
                var endRange = moment(el.endDate).isBetween(criteria.startDate, criteria.endDate);

                if(!startRange && !endRange){
                    return false;
                }
            }

            if(criteria.priceFree != 0 || criteria.priceOne != 0 || criteria.priceTwo != 0 || criteria.priceThree != 0){                
                var price = [];
                if(criteria.priceFree != 0){
                    price.push(0);
                }
                if(criteria.priceOne != 0){
                    price.push(1);
                }
                if(criteria.priceTwo != 0){
                    price.push(2);
                }
                if(criteria.priceThree != 0){
                    price.push(3);
                }

                //working above this line                
                //if event contains atleast one of the checks
                var eventcost = el.cost;
                var matching = price.some(function(element,i,arr){
                    return element === eventcost;
                });
                if(!matching){
                    return false;
                }
                    
            }

            if(el.petFriendly !== criteria.petFriendly && criteria.petFriendly == 1){
                return false;
            }
            if(el.familyFriendly !== criteria.familyFriendly && criteria.familyFriendly == 1){
                return false;
            }
            if(el.smokeFree !== criteria.smokeFree && criteria.smokeFree == 1){
                return false;
            }
            if(el.alcoholFree !== criteria.alcoholFree && criteria.alcoholFree == 1){
                return false;
            }
            if(el.isEighteen !== criteria.isEighteen && criteria.isEighteen == 1){
                return false;
            }
            if(el.isTwentyOne !== criteria.isTwentyOne && criteria.isTwentyOne == 1){
                return false;
            }
            if(el.outdoors !== criteria.outdoors && criteria.outdoors == 1){
                return false;
            }
            if(el.daytime !== criteria.daytime && criteria.daytime == 1){
                return false;
            }
            return true;
        });
    }    
});

