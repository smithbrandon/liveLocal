angular.module('events.directives',[])
    .directive('googleMaps',[function(){
        return {
            restrict: 'E',
            template: '<div id="map"></div>',
            scope: {
                events: '='
            },
            controller: ['$scope',function($scope){
                var map;
                $scope.initialize = function () {
                    if (!$scope.events) {
                        return;
                    }
                    var center;
                    if ($scope.events.length === 1) {
                        center = [$scope.events[0].lat,$scope.events[0].lng];
                    } else {
                        center = [35.032616,-85.314063];
                    }

                    map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 15,
                        center: new google.maps.LatLng(center[0], center[1]),
                        mapTypeId: 'terrain',
                        disableDefaultUI: true,
                        draggable: false,
                        fullscreenControl: false,
                        zoomControl: true,
                        zoomControlOptions: true,
                        scrollwheel: false

                    });

                    populateMap();

                    function populateMap() {
                        for (var i = 0; i < $scope.events.length; i++) {
                            var lat = $scope.events[i].lat;
                            var lng = $scope.events[i].lng;
                            addMarker(lat, lng, map);
                        }
                    }

                    function addMarker(lat, lng, map) {
                        var latLng = new google.maps.LatLng(lat, lng);
                        var marker = new google.maps.Marker({
                            position: latLng,
                            map: map
                        });
                    }
                }    
                $scope.$watchCollection('events', $scope.initialize);
                
            }]
        }
    }])