angular
  .module("UsuarioModule")
  .controller("usuario.show", ($scope, dataProvider) => {
    $scope.usuario = {};

    dataProvider
      .getPerfil()
      .then(response => {
        console.log(response);
        $scope.usuario = response.data;
      })
      .catch(err => {
        console.log(err);
      });
  });
