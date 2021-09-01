import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
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

test("Blog renders title, author, url and likes when the button to show all information has been pressed", () => {
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

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("title");
  expect(component.container).toHaveTextContent("author");
  expect(component.container).toHaveTextContent("url");
  expect(component.container).toHaveTextContent("0");
});

test("Like handler is called twice when the like button is pressed twice", () => {
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
  const mockHandler = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      loggedUser={{ username: "username" }}
      handleLikeClick={mockHandler}
      handleDelete={jest.fn()}
    />
  );

  const button = component.getByText("view");
  fireEvent.click(button);

  const likeButton = component.getByRole("button", { name: "like" });
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
