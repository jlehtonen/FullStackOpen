import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote, create } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector(state => state).sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const addAnecdote = event => {
    event.preventDefault();
    dispatch(create(event.target.anecdote.value));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
