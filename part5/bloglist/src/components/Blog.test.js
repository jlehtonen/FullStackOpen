import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("by default, Blog renders title and author but not url or likes", () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 0,
    user: {
      id: "123",
      name: "name",
      username: "username",
    },
  };
  const component = render(
    <Blog
      blog={blog}
      loggedUser={{ username: "username" }}
      handleLikeClick={jest.fn()}
      handleDelete={jest.fn()}
    />
  );

  expect(component.container).toHaveTextContent("title");
  expect(component.container).toHaveTextContent("author");
  expect(component.container).not.toHaveTextContent("url");
  expect(component.container).not.toHaveTextContent("0");
});
