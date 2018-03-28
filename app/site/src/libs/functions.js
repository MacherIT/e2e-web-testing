// Devuelve uuid unico RFC4122 version 4 compliant
const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

const createBlob = arrayBuffer => {
  let arrayBufferView = new Uint8Array(arrayBuffer);
  let blob = new Blob([arrayBufferView], { type: "image/jpeg" });
  let urlCreator = window.URL || window.webkitURL;
  let imageUrl = urlCreator.createObjectURL(blob);
  return imageUrl;
};
