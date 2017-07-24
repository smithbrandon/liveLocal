app.service('SEOService',['$rootScope',function($rootScope){
    this.setSEO = function(data){
        $rootScope.SEO = {};
        for(var p in data) {
            $rootScope.SEO[p] = data[p];
        }
    }
}]);