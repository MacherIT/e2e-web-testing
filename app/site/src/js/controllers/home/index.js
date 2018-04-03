angular.module("HomeModule", []).controller("home.index", ($scope, $http) => {
  $http.get("/assets/data/home/home.json").then(
    ({ data }) => {
      ({
        cabecera: $scope.cabecera,
        leyendoTuMente: $scope.leyendoTuMente,
        imagenEmpresa: $scope.imagenEmpresa,
        equipoMarketing: $scope.equipoMarketing,
        featuresApp: $scope.featuresApp,
        beneficios: $scope.beneficios,
        ahorro: $scope.ahorro,
        equipoAnt: $scope.equipoAnt
      } = data);
      $scope.featuresItemActivo = $scope.featuresApp.items[0];
      $scope.equipoItemActivo = $scope.equipoAnt.items[0];
    },
    error => {
      console.error(error);
    }
  );

  $scope.setFeaturesItemActivo = item => {
    $scope.featuresItemActivo = item;
  };
  $scope.setEquipoItemActivo = item => {
    $scope.equipoItemActivo = item;
  };
});
