angular.module("MainApp").factory("getApiData", ($http, $rootScope) => {
  const getter = url => {
    return $http({ method: "GET", url: url });
  };

  return {};
});
