//phonecatApp.factory('phoneService', ['$resource','ngAuthSettings',
//function ($resource, ngAuthSettings) {
//    return $resource(ngAuthSettings.apiServiceBaseUri + 'api/:phoneId', {}, {
//        query: { method: 'GET', params: { phoneId: 'phones' }, isArray: true }
//    });
//}]);


phonecatApp.factory('phoneService', ['$http', '$q','$log', 'ngAuthSettings', function ($http, $q, $log, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var phoneServiceFactory = {};

    var _query = function () {
        var deferred = $q.defer();
        $http.get(serviceBase + 'api/phones').success(function (data, status, headers, config) {
                $log.log('PhoneService returned data');
                deferred.resolve(data);
                //return results.data;
            }).error(function (data, status, headers, config) {
                $log.log('Error from PhoneService');
                deferred.reject(data);
            });
        return deferred.promise;

    };

    phoneServiceFactory.query = _query;

    return phoneServiceFactory;

}]);
