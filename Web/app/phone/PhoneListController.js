phonecatApp.controller('PhoneListCtrl', ['$scope', '$log', 'phoneService', 
  function ($scope,$log,phoneService) {
      $scope.phones = [];
      phoneService.query().then(function (result) {
          $log.log('PhoneListCtrl got data');
          $scope.phones = result;
      }, function (error) {
          $log.log('Promise error from PhoneListCtrl: ' + error.message);
      });

      $scope.filterFunction = function (item) {
          if (item.name.toLowerCase().indexOf($scope.$parent.query.toLowerCase()) > -1 || item.snippet.toLowerCase().indexOf($scope.$parent.query.toLowerCase()) > -1)
              return true;
      }
  }]);
