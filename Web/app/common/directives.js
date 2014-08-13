'use strict';

/* Directives */
var phonecatDirectives = angular.module('phonecatDirectives', []);
phonecatDirectives.directive('myLogin', function () {
    return {
        restrict: 'A',
        templateUrl: 'app/user/views/login.html'
    };
});