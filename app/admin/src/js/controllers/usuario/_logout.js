angular
  .module("UsuarioModule")
  .controller("usuario.logout", ($scope, $window, auth) => {
    auth.logout();
    $window.location.href = "#/";
    $window.location.reload();
  });
