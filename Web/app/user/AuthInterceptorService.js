phonecatServices.factory('authInterceptorService', ['$q', '$injector', '$location', '$log', 'localStorageService', function ($q, $injector, $location, $log, localStorageService) {

    var authInterceptorServiceFactory = {};
    var $http;

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            var authService = $injector.get('userService');
            var authData = localStorageService.get('authorizationData');

            if (authData) {
                if (authData.useRefreshTokens) {
                    authService.refreshToken().then(function (response) {
                        var deferred = $q.defer();
                        _retryHttpRequest(rejection.config, deferred);
                        return deferred.promise;
                    }, function () {
                        $log.log('Rejected');
                        $location.path('/');
                        return $q.reject(rejection);
                    });
                }
            }
            //$log.log('Reloading');
            //authService.logOut();
            //$location.path('/');
            //$location.reload();

        }
        return $q.reject(rejection);
    }

    var _retryHttpRequest = function (config, deferred) {
        $http = $http || $injector.get('$http');
        $http(config).then(function (response) {
            $log.log('Got new refresh token - Resolved');
            deferred.resolve(response);
        }, function (response) {
            $log.log('Got new refresh token - Rejected');
            deferred.reject(response);
        });
    }
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);