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

      it("it can be removed by the user that added it", function () {
        cy.get("div").contains("blog title blog author").find("button").click();
        cy.get("div")
          .contains("blog title blog author")
          .parent()
          .find("button")
          .contains("remove")
          .click();
        cy.get("div").contains("blog title blog author").should("not.exist");
      });
    });

    describe("When three blogs have been created", function () {
      beforeEach(function () {
        const getRequestOptions = blogName => ({
          method: "POST",
          url: "http://localhost:3001/api/blogs",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            title: `title-${blogName}`,
            author: `author-${blogName}`,
            url: `url-${blogName}`,
          },
        });
        const token = JSON.parse(localStorage.getItem("loggedBloglistUser")).token;
        cy.request(getRequestOptions("1"));
        cy.request(getRequestOptions("2"));
        cy.request(getRequestOptions("3"));
        cy.visit("http://localhost:3000");
      });

      it("blogs are shown in the order from most to least liked", function () {
        cy.get("div")
          .contains("title-2 author-2")
          .find("button")
          .contains("view")
          .click();
        cy.get("div")
          .contains("title-2 author-2")
          .parent()
          .find("button")
          .contains("like")
          .click();
        cy.wait(100);
        cy.get("div")
          .contains("title-2 author-2")
          .parent()
          .find("button")
          .contains("like")
          .click();

        cy.get("div")
          .contains("title-3 author-3")
          .find("button")
          .contains("view")
          .click();
        cy.get("div")
          .contains("title-3 author-3")
          .parent()
          .find("button")
          .contains("like")
          .click();

        cy.wait(100);
        cy.get(".blog").then(blogs => {
          expect(blogs[0]).to.contain("title-2");
          expect(blogs[1]).to.contain("title-3");
          expect(blogs[2]).to.contain("title-1");
        });
      });
    });
  });
});
