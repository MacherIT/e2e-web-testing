angular
  .module("MainApp")
  .directive("mainMenu", () => {
    return {
      restrict: "E",
      templateUrl: "/views/general/main-menu.html",
      controller: "general.main-menu"
    };
  })
  .directive("footerSection", () => {
    return {
      restrict: "E",
      templateUrl: "/views/general/footer-section.html",
      controller: "general.footer"
    };
  })
  .directive("loadFrame", () => {
    return {
      restrict: "A",
      link: (scope, elm, attrs) => {
        $("document").ready(() => {
          $(elm).attr("src", attrs.source);
        });
      }
    };
  })
  .directive("scrollRight", () => {
    return {
      restrict: "A",
      link: (scope, elm, attrs) => {
        $(elm).on("click", () => {
          $(attrs.target).animate(
            {
              scrollLeft: "+=" + $(attrs.target).width()
            },
            parseInt(attrs.time)
          );
        });
      }
    };
  })
  .directive("scrollLeft", () => {
    return {
      restrict: "A",
      link: (scope, elm, attrs) => {
        $(elm).on("click", () => {
          $(attrs.target).animate(
            {
              scrollLeft: "-=" + $(attrs.target).width()
            },
            parseInt(attrs.time)
          );
        });
      }
    };
  })
  .directive("scrollToContacto", () => {
    return {
      restrict: "A",
      link: (scope, elm, attrs) => {
        $(elm).on("click", () => {
          $("body, html").animate(
            {
              scrollTop: $("footer-section").offset().top
            },
            500
          );
        });
      }
    };
  })
  .directive("scrollToTarget", () => {
    return {
      restrict: "A",
      link: (scope, elm, attrs) => {
        $(elm).on("click", () => {
          $("body, html").animate(
            {
              scrollTop: $(attrs.target).offset().top
            },
            700
          );
        });
      }
    };
  })
  .directive("escondeMenu", () => {
    return {
      restrict: "A",
      link: (scope, elm, attrs) => {
        $(elm).on("click", () => {
          $("#navbar").collapse("hide");
        });
      }
    };
  })
  .directive("flotante", () => {
    return {
      restrict: "A",
      link: (scope, elm, attrs) => {
        $(window).on("scroll", e => {
          if ($(window).scrollTop() > 50) {
            // [TBM]
            if ($(window).width() <= 992) {
              // [TBM]
              $(elm).addClass("flotante");
            }
          } else {
            $(elm).removeClass("flotante");
          }
        });
      }
    };
  });
