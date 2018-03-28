angular.module("AdminApp").factory("dataProvider", ($http, auth) => {
  return {
    //USER
    getPerfil: () => $http.get("/api/usuarios/perfil", auth.secureKey),
    getUsuario: id => $http.get("/api/usuarios/" + id, auth.secureKey),
    getUsuarios: () => $http.get("/api/usuarios", auth.secureKey)
  };
});
