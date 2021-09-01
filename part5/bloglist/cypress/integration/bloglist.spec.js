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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "username",
        password: "password",
      }).then(response => {
        localStorage.setItem("loggedBloglistUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.wait(100);
      cy.get("button").contains("create new blog").click();
      cy.get("#title").type("blog title");
      cy.get("#author").type("blog author");
      cy.get("#url").type("blog url");
      cy.get("button[type=submit]").click();
      cy.get("div").contains("blog title blog author").should("exist");
    });

    describe("When a blog has been created", function () {
      beforeEach(function () {
        const token = JSON.parse(localStorage.getItem("loggedBloglistUser")).token;
        cy.request({
          method: "POST",
          url: "http://localhost:3001/api/blogs",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            title: "blog title",
            author: "blog author",
            url: "blog url",
          },
        });
        cy.visit("http://localhost:3000");
      });

      it("it can be liked", function () {
        cy.get("div").contains("blog title blog author").should("exist");
        cy.get("button").contains("view").click();
        cy.get("button").contains("like").click();
        cy.get("#like-count").contains("1").should("exist");
      });
    });
  });
});
