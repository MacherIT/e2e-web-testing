angular
  .module("MainApp")
  .controller("general.main-menu", () => {})
  .controller("general.footer", ($scope, $http) => {
    $scope.sent = false;
    $scope.formcontacto = {
      nombre: "",
      telefono: "",
      email: "",
      consulta: "",
      solicitado: false
    };
    $scope.formcontacto.enviar = () => {
      $scope.sent = true;
      $http
        .post("api/mailing/contacto", {
          nombre: $scope.formcontacto.nombre,
          telefono: $scope.formcontacto.telefono,
          email: $scope.formcontacto.email,
          consulta: $scope.formcontacto.consulta
        })
        .then(
          response => {
            $scope.sent = false;
            $scope.formcontacto.solicitado = true;
            $scope.formcontacto.envioCorrecto = true;
          },
          error => {
            $scope.sent = false;
            $scope.formcontacto.solicitado = true;
            $scope.formcontacto.envioCorrecto = false;
            console.error(error);
          }
        );
    };
  });
