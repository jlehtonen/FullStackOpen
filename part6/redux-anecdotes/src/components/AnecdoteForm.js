import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { setNotification, unsetNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async event => {
    event.preventDefault();
    const newAnecdote = event.target.anecdote.value;
    const addedAnecdote = await anecdoteService.create(newAnecdote);
    dispatch(create(addedAnecdote.content));
    dispatch(setNotification(`You created '${addedAnecdote.content}'`));
    setTimeout(() => {
      dispatch(unsetNotification());
    }, 5000);
    event.target.anecdote.value = "";
  };

  return (
    <div>
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

export default AnecdoteForm;
