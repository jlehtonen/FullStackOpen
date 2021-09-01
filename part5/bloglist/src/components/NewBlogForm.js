import { useState } from "react";

const NewBlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleFormSubmit = event => {
    event.preventDefault();
    handleSubmit(title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          title:
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
