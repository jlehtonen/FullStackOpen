import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Field, { useField } from "./Field";
import Button from "./Button";

const Form = styled.form`
  margin-bottom: 0.5rem;
  max-width: 400px;
`;

const NewBlogForm = ({ handleSubmit }) => {
  const [title, resetTitle] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [url, resetUrl] = useField("text");
  const dispatch = useDispatch();

  const handleFormSubmit = event => {
    event.preventDefault();
    handleSubmit(title.value, author.value, url.value);
    dispatch(setNotification(`A new blog '${title.value}' by ${author.value} added`));
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Field label="Title" id="title" {...title} />
      <Field label="Author" id="author" {...author} />
      <Field label="Url" id="url" {...url} />
      <Button fullwidth type="submit">
        Add a blog
      </Button>
    </Form>
  );
};

export default NewBlogForm;
