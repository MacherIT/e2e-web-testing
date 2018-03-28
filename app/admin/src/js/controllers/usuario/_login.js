angular
  .module("UsuarioModule")
  .controller("usuario.login", ($scope, $window, auth) => {
    if (!auth.isLoggedIn()) {
      $scope.email = "";
      $scope.password = "";
      $scope.failLogin = false;

      $scope.sendForm = () => {
        auth
          .login({ email: $scope.email, password: $scope.password })
          .then(response => {
            if (response.status === 401) {
              $scope.failLogin = true;
            } else {
              $window.location.href = "#/user";
              $window.location.reload();
            }
          });
      };
    } else {
      $window.location.href = "#/user";
      $window.location.reload();
    }
  });
