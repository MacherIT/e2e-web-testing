angular
  .module("UsuarioModule")
  .controller("usuario.new", ($scope, $window, auth, dataProvider, $http) => {
    if (!auth.isLoggedIn()) {
      $scope.nuevoUsuario = {
        email: "",
        nombre: "",
        apellido: ""
      };

      $scope.registrarUsuario = () => {
        $scope.f = document.getElementById("usuario-avatar").files[0];

        $scope.notMatch = false;
        $scope.dupped = false;

        if ($scope.passwordCheck === $scope.nuevoUsuario.password) {
          auth
            .register($scope.nuevoUsuario)
            .then(response => {
              if (auth.isLoggedIn()) {
                if ($scope.f) {
                  let data = new FormData();
                  data.append("imagenes", $scope.f);

                  console.log(data);

                  $http
                    .post("/upload", data, {
                      headers: {
                        transformRequest: angular.identity,
                        "Content-Type": undefined,
                        Authorization: "Bearer " + auth.getToken()
                      }
                    })
                    .then(response => {
                      if (response.status === 200) {
                        $scope.nuevoUsuario.avatar = response.data[0].uri;

                        auth
                          .updateUser($scope.nuevoUsuario)
                          .then(response => {
                            $window.location.href = "#/usuarios/perfil";
                            $window.location.reload();
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      }
                    });
                }
              } else {
                $window.location.href = "#/usuarios/perfil";
                $window.location.reload();
              }
            })
            .catch(err => {
              console.log(err);
              if (err.data.error.code)
                $scope.dupped = err.data.error.code == 11000 ? true : false;
            });
        } else {
          $scope.notMatch = true;
        }
      };
    } else {
      $window.location.href = "#/user";
      $window.location.reload();
    }
  });
