'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);


/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'angular-loading-bar',
  'LocalStorageModule',
  'phonecatAnimations',
  'phonecatControllers',
  'phonecatDirectives',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
          templateUrl: 'app/phone/views/phone-list.html',
          controller: 'PhoneListCtrl'
      }).
      //when('/login', {
      //    templateUrl: 'partials/login.html',
      //    controller: 'loginCtrl'
      //}).
      when('/phones/:phoneId', {
        templateUrl: 'app/phone/views/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);

//var serviceBase = 'http://localhost:26264/';
phonecatApp.constant('ngAuthSettings', {
    apiServiceBaseUri: 'http://localhost:8888/',
    clientId: 'ngAuthApp'
});

phonecatApp.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.latencyThreshold = 50;
    cfpLoadingBarProvider.includeBar = true;
}]);

phonecatApp.run(['userService', function (userService) {
    userService.fillAuthData();
}]);

phonecatApp.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
}]);

