angular.module('events.factories', [])
.factory('Event', ['$resource', function($resource) {
    return $resource('/api/events/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        },
        getAttendingCnt: {
            method: 'GET',
            url: '/api/events/:eventId/interested'
        },
        getInteresteedCnt: {
            method: 'GET',
            url: '/api/events/:eventId/going'
        },
        tagEvent: {
            method: 'POST',
            url: '/api/events/:eventId/tag'
        },
        untagEvent: {
            method: 'DELETE',
            url: '/api/events/:eventId/tag/:id'
        },
        getEventsByUser:{
            method: 'GET',
            url: '/api/events/user/:userId',
            isArray: true
        }
    });
}])
.factory('Category', ['$resource', function($resource) {
    return $resource('/api/categories/:id',{id: '@id'},{
        update: {
            method: 'PUT'
        }
    });
}])
.factory('Tag', ['$resource', function($resource) {
    return $resource('/api/tags/:id',{id: '@id'},{
        update: {
            method: 'PUT'
        }
    });
}])
.factory('User', ['$resource', function($resource) {
    return $resource('/api/users/:id',{id: '@id'},{
        update: {
            method: 'PUT'
        }
    });
}])
.factory('Geo', ['$http',function($http){
    var GeoObj = {};

    GeoObj.retrieve = function(address, city, state){
        var addressSan = address.replace(' ','+');
        var citySan = city.replace(' ','+');
        var coord = {};
        return $http({
            method: 'GET',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressSan +',+' + citySan + ',+' + state + '&key=AIzaSyBPb-IgcKTbo1DIl8oe9i0-6aptQ2BZCUI'
        }).then(function(success){
            console.log(success);
            coord.lat = success.data.results[0].geometry.location.lat;
            coord.lng = success.data.results[0].geometry.location.lng;
            return coord;
        },function(err){
            console.log(err);
        });
    }
    return GeoObj;
}]);