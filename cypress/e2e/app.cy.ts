describe("Signed out", () => {
  it("should navigate to the ssr page in a signed out state", () => {
    // open dashboard page
    cy.visit("http://localhost:3000/sign-in", {
      failOnStatusCode: false,
    });

    cy.get("#identifier-field").type("ismaeljarias@gmail.com");
    cy.get('button[data-localization-key="formButtonPrimary"]').click();
    cy.get("#password-field").type("1234");
    cy.get('button[data-localization-key="formButtonPrimary"]').click();

    cy.setCookie("chat", "e6e56bf4-0de3-4a50-b44e-bdcbc8ecf654");

    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.findByTestId("logo").should("exist");

    cy.get('[name="message"]').type("Hello, world!");
  });
});
