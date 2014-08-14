//phonecatApp.factory('phoneService', ['$resource','ngAuthSettings',
//function ($resource, ngAuthSettings) {
//    return $resource(ngAuthSettings.apiServiceBaseUri + 'api/:phoneId', {}, {
//        query: { method: 'GET', params: { phoneId: 'phones' }, isArray: true }
//    });
//}]);


phonecatApp.factory('phoneService', ['$http', '$log', 'ngAuthSettings', function ($http, $log, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var phoneServiceFactory = {};

    var _query = function () {

        return $http.get(serviceBase + 'api/phones').then(function (results) {
            $log.log('PhoneService returned data');
            return results.data;
        });
    };

    phoneServiceFactory.query = _query;

    return phoneServiceFactory;

}]);
