phonecatApp.factory('authInterceptorService', ['$q', '$injector', '$location', '$log', 'localStorageService', 'alertService',
function ($q, $injector, $location, $log, localStorageService, alertService) {

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
        $log.log('ResponseError: ' + rejection.config.url + " - " + rejection.status);
        var deferred = $q.defer();
        if (rejection.status === 403) {
            alertService.add('danger', 'Access denied');
            deferred.reject(rejection);
        }
        else if (rejection.status === 401) {
            var authService = $injector.get('userService');
            authService.refreshToken().then(function (response) {
                $log.log('Got new refresh token');
                _retryHttpRequest(rejection.config, deferred);
            }, function () {
                //authService.logOut();
                $log.log('refreshToken rejected');
                //$location.path('/');
                deferred.reject(rejection);
            });
        }
        else {
            deferred.reject(rejection);
        }
        return deferred.promise;
    }


    var _retryHttpRequest = function (config, deferred) {
        $http = $http || $injector.get('$http');
        $log.log('Retrying request to: ' + config.url);
        config.headers.retry = '1';
        $http(config).then(function (response) {
            deferred.resolve(response);
            $log.log('Retry was resolved');
        }, function (response) {
            deferred.reject(response);
            $log.log('Retry was rejected');
        });
    }
    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);