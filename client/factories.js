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
        }
    });
}])
.factory('Category', ['$resource', function($resource) {
    return $resource('/api/categories/:id');
}])
.factory('Tag', ['$resource', function($resource) {
    return $resource('/api/tags/:id');
}])
.factory('User', ['$resource', function($resource) {
    return $resource('/api/users/:id');
}])