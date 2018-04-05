// https://gist.github.com/javierarques/0c4c817d6c77b0877fda

// https://gist.github.com/rocknrollMarc/85296aab8ce8e3645a07

// https://stackoverflow.com/questions/20927652/how-to-use-protractor-on-non-angularjs-website/23198865#23198865

describe("leyendo tu mente", () => {
  browser.get("http://localhost:3000");
  it("verifica funcionalidad y visibilidad de desplegables", () => {
    browser.driver.sleep(1000);

    // element(by.css("leyendo-tu-mente"))
    //   .getLocation()
    //   .then(offset => {
    //     browser.driver
    //       .executeScript("window.scrollTo(0,arguments[0]);", offset.y)
    //       .then(() => {});
    //   });

    expect(
      element
        .all(by.css(".main-titulo"))
        .first()
        .getText()
        .then(titulo => titulo.toLowerCase())
    ).toBe(
      "ant convierte\nsu comercio en\nuna compañía\nonline profesional",
      "El primer título debería ser correcto"
    );

    expect(
      element
        .all(by.css("leyendo-tu-mente .items .item"))
        .first()
        .isDisplayed()
    ).toBe(false, "Los items deberian ser invisibles");
    browser.driver.executeScript("window.scrollTo(0,20000);").then(() => {
      browser.driver.sleep(1000);
      expect(
        element
          .all(by.css("leyendo-tu-mente .items .item"))
          .first()
          .isDisplayed()
      ).toBe(true, "Los items deberían ser visibles");
      expect(
        element
          .all(by.css("leyendo-tu-mente .items .item .texto"))
          .first()
          .isDisplayed()
      ).toBe(false, "Los desplegables deberían ser invisibles");
      element
        .all(by.css("leyendo-tu-mente .items .item"))
        .first()
        .click()
        .then(() => {
          browser.driver.sleep(1000);
          expect(
            element
              .all(by.css("leyendo-tu-mente .items .item .texto"))
              .first()
              .isDisplayed()
          ).toBe(true, "Los desplegables deberían ser visibles");
        });
    });
  });
});
