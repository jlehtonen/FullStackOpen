describe("Bloglist app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", {
      username: "username",
      password: "password",
      name: "Name",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("#login-form").should("exist");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("username");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.get("#login-form").should("not.exist");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("username");
      cy.get("#password").type("wrong password");
      cy.get("#login-button").click();
      cy.get("#login-form").should("exist");
    });
  });
});
