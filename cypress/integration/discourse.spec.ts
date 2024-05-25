describe("Discourse Automation Test", () => {
  it("Should visit the Discourse site", () => {
    const discourseUrl = "http://192.168.1.3/latest";
    cy.visit(discourseUrl);
    cy.contains("Log In").click();
    cy.get("#login-account-name").type("your_username");
    cy.get("#login-account-password").type("your_password");
    cy.get(".btn-primary").click();
  });
});