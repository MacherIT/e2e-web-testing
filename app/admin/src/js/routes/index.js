angular.module("AdminApp").config(($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix("");

  $routeProvider
    // USUARIO

    .when("/usuarios", {
      templateUrl: "views/usuario/index.html",
      controller: "usuario.index"
    })
    .when("/usuarios/registrar", {
      templateUrl: "views/usuario/new.html",
      controller: "usuario.new"
    })
    .when("/usuarios/iniciar-sesion", {
      templateUrl: "views/usuario/login.html",
      controller: "usuario.login"
    })
    .when("/usuarios/cerrar-sesion", {
      templateUrl: "views/home/index.html",
      resolve: {
        secureAccess: (auth, $window) => {
          if (!auth.isLoggedIn()) {
            $window.location.href = "#/";
            $window.location.reload();
          }
        }
      },
      controller: "usuario.logout"
    })
    .when("/usuarios/perfil", {
      templateUrl: "views/usuario/perfil.html",
      resolve: {
        secureAccess: (auth, $window) => {
          if (!auth.isLoggedIn()) {
            $window.location.href = "#/";
            $window.location.reload();
          }
        }
      },
      controller: "usuario.show"
    })
    .when("/usuario/:id", {
      templateUrl: "views/user/show.html",
      controller: "user.show"
    })
    //OTHERWISE

    .otherwise({
      templateUrl: "views/home/index.html",
      redirectTo: "/"
    });

  // use the HTML5 History API
  // $locationProvider.html5Mode(true);
});
