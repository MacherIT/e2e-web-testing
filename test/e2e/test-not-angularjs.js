describe("leyendo tu mente", () => {
  browser.get("http://localhost:3000");
  it("verifica que el body esté presente", () => {
    browser.waitForAngularEnabled(false);
    browser.get("http://localhost:3000");
    expect(element(by.css("body")).isPresent()).toBe(true);
  });
});
