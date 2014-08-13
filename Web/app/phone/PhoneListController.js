phonecatControllers.controller('PhoneListCtrl', ['$scope', '$log','phoneService', 'userService',
  function ($scope,$log,phoneService, userService) {
      //if (userService.authentication.isAuth) {
      //$log.log('when');

      $scope.phones = phoneService.query();
      $scope.phones.$promise.then(function (result) {
          $scope.phones = result;
      }, function () {
          $log.log('error');
      });
      //}
      $scope.filterFunction = function (item) {
          if (item.name.toLowerCase().indexOf($scope.$parent.query.toLowerCase()) > -1 || item.snippet.toLowerCase().indexOf($scope.$parent.query.toLowerCase()) > -1)
              return true;
      }
  }]);
