import { useDispatch } from "react-redux";
import { likeBlog, addComment, deleteBlog } from "../reducers/blogReducer";
import styled from "styled-components";
import Button from "./Button";
import { useHistory } from "react-router";

const Title = styled.h2`
  color: #444;
`;

const Subtitle = styled.div`
  margin-bottom: 3rem;
  font-weight: 600;
`;

const Author = styled.span`
  color: #9c9c9c;
  margin-right: 1rem;
`;

const SourceLink = styled.a`
  text-decoration: none;
  color: #6a1b9a;

  :hover {
    text-decoration: underline;
  }
`;

const LikeDisplay = styled.div`
  margin-bottom: 0.3rem;
  color: #444;
`;

const LikeContainer = styled.div`
  margin-bottom: 2rem;
`;

const UserContainer = styled.div`
  color: #9c9c9c;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CommentsTitle = styled.h3`
  color: #444;
  margin-bottom: 0.5rem;
  margin-top: 2rem;
`;

const CommentInput = styled.input`
  padding: 0.7rem 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid #444;
  width: 300px;
  margin-right: 0.5rem;
`;

const CommentForm = styled.form`
  margin-bottom: 1rem;
`;

const CommentList = styled.ul`
  list-style: none;

  > *:nth-child(odd) {
    background-color: #faf2ff;
  }

  > :first-child {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }

  > :last-child {
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
`;

const Comment = styled.li`
  font-weight: 600;
  color: #444;
  padding: 0.7rem 1rem;
  font-size: 0.95rem;
`;

const BlogPage = ({ blog, loggedUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleNewComment = event => {
    event.preventDefault();
    dispatch(addComment(blog.id, event.target.comment.value));
    event.target.comment.value = "";
  };

  const handleRemove = () => {
    if (window.confirm(`Remove the blog '${blog.title}' by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      history.push("/");
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <Title>{blog.title}</Title>
      <Subtitle>
        <Author>{blog.author}</Author>
        <SourceLink href={blog.url}>(Original URL)</SourceLink>
      </Subtitle>
      <LikeContainer>
        <LikeDisplay>{blog.likes} likes</LikeDisplay>
        <Button small secondary onClick={handleLike}>
          Like
        </Button>
      </LikeContainer>
      <UserContainer>Added by {blog.user.name}</UserContainer>
      {blog.user.username === loggedUser.username ? (
        <Button secondary small onClick={handleRemove}>
          Remove blog
        </Button>
      ) : null}
      <CommentsTitle>Comments</CommentsTitle>
      <CommentForm onSubmit={handleNewComment}>
        <CommentInput type="text" name="comment" />
        <Button type="submit">Add a new comment</Button>
      </CommentForm>
      <CommentList>
        {blog.comments.map(comment => (
          <Comment key={comment}>{comment}</Comment>
        ))}
      </CommentList>
    </div>
  );
};

export default BlogPage;
