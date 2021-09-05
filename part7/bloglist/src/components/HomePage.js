import { useDispatch } from "react-redux";
import { useRef } from "react";
import Togglable from "./Togglable";
import NewBlogForm from "./NewBlogForm";
import BlogList from "./BlogList";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import styled from "styled-components";

const FormContainer = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const HomePage = ({ blogs }) => {
  const dispatch = useDispatch();
  const newBlogFormRef = useRef();

  const handleNewBlog = (title, author, url) => {
    newBlogFormRef.current.toggleVisibility();
    dispatch(createBlog(title, author, url));
    dispatch(setNotification(`a new blog ${title} by ${author} added`));
  };

  return (
    <div>
      <FormContainer>
        <Togglable buttonLabel="Add a new blog" ref={newBlogFormRef}>
          <Title>Add a new blog</Title>
          <NewBlogForm handleSubmit={handleNewBlog} />
        </Togglable>
      </FormContainer>
      <BlogList blogs={blogs.sort((a, b) => b.likes - a.likes)} />
    </div>
  );
};

export default HomePage;
