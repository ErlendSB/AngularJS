phonecatServices.factory('phoneService', ['$resource','ngAuthSettings',
function ($resource, ngAuthSettings) {
    return $resource(ngAuthSettings.apiServiceBaseUri + '/api/:phoneId', {}, {
        query: { method: 'GET', params: { phoneId: 'phones' }, isArray: true }
    });
}]);
