angular.module("MainApp").config(($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix("");

  $routeProvider
    .when("/", {
      templateUrl: "/views/home/index.html",
      controller: "home.index"
    })
    .when("/carrito", {
      templateUrl: "/views/carrito/index.html",
      controller: "carrito.index"
    })
    .when("/productos", {
      templateUrl: "/views/productos/index.html",
      controller: "productos.index"
    })
    .when("/productos/:id", {
      templateUrl: "/views/productos/show.html",
      controller: "productos.show"
    })

    

    .when("/login", {
      templateUrl: "/views/auth/login.html",
      controller: "auth.login"
    })
    .when("/logout", {
      templateUrl: "views/home/index.html",
      resolve: {
        secureAccess: (auth, $window) => {
          if (!auth.isLoggedIn()) {
            $window.location.href = "#/";
            $window.location.reload();
          }
        }
      },
      controller: "auth.logout"
    })

    

    .otherwise({
      templateUrl: "/views/home/index.html",
      redirectTo: "/"
    });
});
