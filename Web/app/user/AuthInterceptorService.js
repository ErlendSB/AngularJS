phonecatApp.factory('authInterceptorService', ['$q', '$injector', '$log', 'localStorageService',
function ($q, $injector, $log, localStorageService) {

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
            //var $route = $injector.get('$route');
            if (authData) {
                if (authData.useRefreshTokens) {
                    $log.log('Interceptor Response error 401: userRefreshTokens:' + authData.useRefreshTokens);
                    authService.refreshToken().then(function (response) {
                        $log.log('Retrying request to: ' + rejection.config.url);
                        var deferred = $q.defer();
                        _retryHttpRequest(rejection.config, deferred);
                        return deferred.promise;
                    }, function () {
                        $log.log('Rejected');
                        //$route.reload();
                        return $q.reject(rejection);
                    });
                }
            }
            //$log.log('Reloading');
            //authService.logOut();
            //$location.path('/');
            //location.reload();
            //$route.reload();

        }
        $log.log('responseError: ' + rejection.config.url);
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