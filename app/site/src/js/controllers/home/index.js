angular.module("HomeModule", []).controller("home.index", ($scope, $http) => {
  $scope.newsletters = {
    email: "",
    solicitado: false
  };

  $scope.newsletters.enviar = () => {
    $http
      .post("api/mailing/newsletters", {
        email: $scope.newsletters.email
      })
      .then(
        response => {
          $scope.newsletters.solicitado = true;
          $scope.newsletters.envioCorrecto = true;
          console.log(response);
        },
        error => {
          $scope.newsletters.solicitado = true;
          $scope.newsletters.envioCorrecto = false;
          console.error(error);
        }
      );
  };
});
