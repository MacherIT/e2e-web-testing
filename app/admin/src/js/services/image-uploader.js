angular.module("AdminApp").factory("imageUploader", ($http, auth) => {
  return {
    uploadFiles: imageArray => {
      //
      let data = new FormData();
      for (let i = 0; i < imageArray.length; i++) {
        data.append("imagenes", imageArray[i]);
      }
      //
      return $http
        .post("/upload", data, {
          headers: {
            transformRequest: angular.identity,
            "Content-Type": undefined,
            Authorization: "Bearer " + auth.getToken()
          }
        })
        .then(response => {
          return response;
        });
    }
  };
});
