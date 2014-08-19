phonecatApp.controller('MainCtrl', ['$scope', '$rootScope', '$log','$modal','userService', '$location','alertService',
  function ($scope, $rootScope, $log,$modal,userService, $location, alertService) {
      $scope.alerts = $rootScope.alerts;
      $scope.closeAlert = function (index) {
          alertService.closeAlert(index);
      };
      $scope.query = "";
      $scope.authentication = userService.authentication;
      $scope.logOut = function () {
          userService.logOut();
      };

      $scope.reload = function () {
          $location.path('/');
      };

  }]);
