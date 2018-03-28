angular.module("AdminApp").factory("auth", ($http, $window) => {
  var saveToken = token => {
    $window.localStorage["mtgroup-token"] = token;
  };

  var getToken = () => $window.localStorage["mtgroup-token"];

  var secureKey = {
    headers: {
      Authorization: "Bearer " + getToken()
    }
  };

  var isLoggedIn = () => {
    var token = getToken();
    var payload;

    if (token) {
      payload = token.split(".")[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  var currentUser = () => {
    if (isLoggedIn()) {
      var token = getToken();
      var payload = token.split(".")[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return { email: payload.email, name: payload.name };
    }
  };

  var register = user =>
    $http.post("/api/usuarios", user).then(response => {
      saveToken(response.data.token);
    });

  var updateUser = user =>
    $http
      .put("/api/usuarios/perfil", user, {
        headers: {
          Authorization: "Bearer " + getToken()
        }
      })
      .then(response => {
        // console.log(response);
      });

  var login = user =>
    $http.post("/api/usuarios/login", user).then(
      response => {
        saveToken(response.data.token);
        return response;
      },
      err => {
        return err;
      }
    );

  var logout = () => {
    $window.localStorage.removeItem("mtgroup-token");
  };

  return {
    currentUser: currentUser,
    saveToken: saveToken,
    getToken: getToken,
    secureKey: secureKey,
    isLoggedIn: isLoggedIn,
    register: register,
    updateUser: updateUser,
    login: login,
    logout: logout
  };
});
