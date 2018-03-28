angular
  .module("AdminApp", ["ngRoute"])
  .controller("mainController", ($scope, $location, $rootScope, auth) => {
    $rootScope.isLoggedIn = auth.isLoggedIn();

    $scope.rutas = [];

    $rootScope.$on("$routeChangeSuccess", () => {
      $scope.rutas = [];

      let rutas = $location.path().split("/");

      if (rutas[1] != "") {
        let path = "";

        let bar = "";

        for (let i = 0; i < rutas.length; i++) {
          if (rutas[i] != "") {
            let nombre = "";
            path += bar + rutas[i];
            nombre = rutas[i] = rutas[i].replace(/-/g, " ");
            $scope.rutas.push({ nombre: nombre, link: path, active: false });
            bar = "/";
          }
        }

        $scope.rutas[$scope.rutas.length - 1].active = true;
      }
    });

    $rootScope.deleteProp = (obj, prop) => {
      delete obj[prop];
    };
  });
