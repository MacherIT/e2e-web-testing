angular.module("MainApp").factory("auth", ($http, $window) => {
  const getToken = () => $window.localStorage["ant-token"];

  const secureKey = {
    headers: {
      Authorization: "Bearer " + getToken()
    }
  };
  const saveToken = token => {
    $window.localStorage["ant-token"] = token;
  };
  return {
    saveToken: token => saveToken(token),
    getToken: () => getToken(),
    secureKey: secureKey,
    isLoggedIn: () => {
      let token = getToken();
      let payload;

      if (token) {
        payload = token.split(".")[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    },
    currentUser: () => {
      if (isLoggedIn()) {
        let token = getToken();
        let payload = token.split(".")[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return { email: payload.email, name: payload.name };
      }
    },
    login: user =>
      $http.post("/api/usuarios/login", user).then(
        response => {
          saveToken(response.data.token);
          return response;
        },
        err => {
          return err;
        }
      ),
    logout: () => {
      $window.localStorage.removeItem("ant-token");
    }
  };
});
