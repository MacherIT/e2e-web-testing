angular
  .module("MainApp", [
    "ngRoute",
    "ngTouch",
    "HomeModule",
    "AuthModule"
  ])
  .controller(
    "mainController",
    ($location, $rootScope, $window, auth) => {

      $rootScope.isMobile = $window.innerWidth <= 768;

      angular.element($window).bind("resize", () => {
        $rootScope.isMobile = $window.innerWidth <= 768;
        $rootScope.$$phase || $rootScope.$apply();
      });

      $rootScope.$on("$routeChangeSuccess", () => {
        let bodyClass = "";

        let path = $location.$$path.split("/");

        path.map(tramo => {
          if (tramo !== "") {
            bodyClass += `-${tramo}`;
          }
        });

        $rootScope.bodyClass =
          bodyClass !== "" ? `page${bodyClass}` : "page-home";
      });
    }
  )
  .filter("precio", () => {
    return input => {
      if (input) {
        return parseFloat(input).toFixed(2);
      }
      return "";
    };
  })
  .filter("encodeurl", () => {
    return input => {
      if (input) {
        return window.encodeURIComponent(input);
      }
      return "";
    };
  })
  .filter("removeTrailingSlash", () => {
    return input => {
      if (input) {
        if (input[0] === "/") return input.slice(1);
        else return input;
      }
      return "";
    };
  });
