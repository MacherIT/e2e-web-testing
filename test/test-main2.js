describe("angularjs homepage todo list", () => {
  it("should add a todo", () => {
    browser.get("http://localhost:3000");

    // let el = element.all(by.css(".main-titulo"));
    // expect(el.first().getText()).toBe(
    //   "ANT CONVIERTE\nSU COMERCIO EN\nUNA COMPAÑÍA\nONLINE PROFESIONAL"
    // );
    // let el = element(
    //   by.css(
    //     "leyendo-tu-mente.seccion-home > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
    //   )
    // );
    expect(
      element(
        by.css(
          "leyendo-tu-mente.seccion-home > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)"
        )
      ).isDisplayed()
    ).toBe(false);

    browser.wait(() => {return expect(

        element(by.css(
          "leyendo-tu-mente.seccion-home > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)"
        )
      ).isDisplayed()
}, 5000);
  });
});
