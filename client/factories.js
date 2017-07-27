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