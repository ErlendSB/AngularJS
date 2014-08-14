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

    var _response = function (response) {
        $log.log('Response: ' + response.config.url + " - " + response.status);
        if (response.status === 401) {
            var authService = $injector.get('userService');
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                if (authData.useRefreshTokens) {
                    $log.log('Interceptor Response error 401: userRefreshTokens:' + authData.useRefreshTokens);
                    authService.refreshToken().then(function (response) {
                        $log.log('Retrying request to: ' + response.config.url);
                        var deferred = $q.defer();
                        _retryHttpRequest(response.config, deferred);
                        return deferred.promise;
                    }, function () {
                        $log.log('Rejected');
                        //return $q.reject(rejection);
                    });
                }
            }

        }
        return response;
    }

    var _responseError = function (rejection) {
        $log.log('ResponseError: ' + rejection.config.url + " - " + rejection.status);
        var deferred = $q.defer();
        if (rejection.status === 401) {
            var authService = $injector.get('userService');
            var authData = localStorageService.get('authorizationData');
            //var $route = $injector.get('$route');
            if (authData) {
                if (authData.useRefreshTokens) {
                    $log.log('Interceptor Response error 401: userRefreshTokens:' + authData.useRefreshTokens);
                    authService.refreshToken().then(function (response) {
                        $log.log('Retrying request to: ' + rejection.config.url);
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
        else {
            deferred.reject(rejection);
        }
        $log.log('responseError: ' + rejection.config.url);
        //return $q.reject(rejection);
        return deferred.promise;
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
    //authInterceptorServiceFactory.response = _response;

    return authInterceptorServiceFactory;
}]);