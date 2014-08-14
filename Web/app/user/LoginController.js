phonecatApp.controller('loginCtrl', ['$scope', '$location', '$route', 'userService', function ($scope, $location, $route, userService) {

    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: true
    };

    $scope.message = "";

    $scope.login = function () {

        userService.login($scope.loginData).then(function (response) {
            //$scope.message = "logged in";
            //$location.path('/phones');
            $route.reload();

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

}]);
