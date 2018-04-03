angular
  .module("HomeModule")
  .directive("fadeInOnScroll", () => {
    return {
      restrict: "A",
      link: (scope, elm, attrs) => {
        $(window).on("scroll", e => {
          if (
            $(window).scrollTop() + window.innerHeight * 0.5 >=
            $(elm).offset().top
          ) {
            // console.log(elm);
            $(elm)
              .find(".cuerpo")
              .css("opacity") == 0 &&
              $(elm)
                .find(".cuerpo")
                .addClass("fadeIn");
          }
        });
      }
    };
  })
  .directive("cabecera", () => {
    return {
      restrict: "E",
      templateUrl: "/views/home/cabecera.html"
    };
  })
  .directive("leyendoTuMente", () => {
    return {
      restrict: "E",
      templateUrl: "/views/home/leyendo-tu-mente.html"
    };
  })
  .directive("imagenEmpresa", () => {
    return {
      restrict: "E",
      templateUrl: "/views/home/imagen-empresa.html"
    };
  })
  .directive("equipoMarketing", () => {
    return {
      restrict: "E",
      templateUrl: "/views/home/equipo-marketing.html"
    };
  })
  .directive("featuresApp", () => {
    return {
      restrict: "E",
      templateUrl: "/views/home/features-app.html"
    };
  })
  .directive("beneficios", () => {
    return {
      restrict: "E",
      templateUrl: "/views/home/beneficios.html"
    };
  })
  .directive("ahorro", () => {
    return {
      restrict: "E",
      templateUrl: "/views/home/ahorro.html"
    };
  })
  .directive("equipoAnt", () => {
    return {
      restrict: "E",
      templateUrl: "/views/home/equipo-ant.html"
    };
  });
