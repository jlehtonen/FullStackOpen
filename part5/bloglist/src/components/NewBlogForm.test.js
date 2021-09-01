import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import NewBlogForm from "./NewBlogForm";

test("handleSubmit is called with correct arguments", () => {
  const mockHandler = jest.fn();
  const component = render(
    <NewBlogForm handleSubmit={mockHandler} showNotification={jest.fn()} />
  );

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  fireEvent.change(title, { target: { value: "blog title" } });
  fireEvent.change(author, { target: { value: "blog author" } });
  fireEvent.change(url, { target: { value: "blog url" } });

  const submit = component.getByText("create");
  fireEvent.click(submit);

  expect(mockHandler.mock.calls[0][0]).toBe("blog title");
  expect(mockHandler.mock.calls[0][1]).toBe("blog author");
  expect(mockHandler.mock.calls[0][2]).toBe("blog url");
});
