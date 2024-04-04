describe("Chat app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/sign-in", {
      failOnStatusCode: false,
    });

    cy.get("#identifier-field").type("test@gmail.com");
    cy.get('button[data-localization-key="formButtonPrimary"]').click();
    cy.get("#password-field").type("1234");
    cy.get('button[data-localization-key="formButtonPrimary"]').click();

    cy.setCookie("chat", "e6e56bf4-0de3-4a50-b44e-bdcbc8ecf654");

    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("should input a chat message", () => {
    cy.findByTestId("logo").should("exist");
    cy.get('[name="message"]').type("Hello, world!");

    cy.get('button[aria-label="Send Chat Message"][type="submit"]').click();
  });

  it("should login as admin and check chats", () => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();

    cy.visit("http://localhost:3000/sign-in", {
      failOnStatusCode: false,
    });

    cy.get("#identifier-field").type("admin@admin.com");
    cy.get('button[data-localization-key="formButtonPrimary"]').click();
    cy.get("#password-field").type("1234");
    cy.get('button[data-localization-key="formButtonPrimary"]').click();

    cy.setCookie("chat", "e6e56bf4-0de3-4a50-b44e-bdcbc8ecf653");

    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.findByTestId("admin").click();
    cy.findByTestId("chat-test@gmail.com").click();
    cy.url().should("include", "/user_");
  });
});
