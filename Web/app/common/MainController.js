phonecatApp.controller('MainCtrl', ['$scope', 'userService', '$location',
  function ($scope, userService, $location) {
      $scope.query = "";
      $scope.authentication = userService.authentication;
      $scope.logOut = function () {
          userService.logOut();
      };

      $scope.reload = function () {
          $location.path('/');
      };

      $scope.$on('UserLoggedIn', function () {
          $('#LoginModal').modal('hide');
      });

      $scope.$on('UserLoggedOut', function () {
          $('#LoginModal').modal('show');
          $('#LoginModal form')[0].reset();
      });

  }]);
