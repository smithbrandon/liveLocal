angular.module('events.factories', [])
.factory('Event', ['$resource', function($resource) {
    return $resource('/api/events/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
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