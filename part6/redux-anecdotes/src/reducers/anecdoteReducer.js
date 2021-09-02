import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "REPLACE_ANECDOTE":
      const id = action.data.anecdote.id;
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data.anecdote
      );
    case "CREATE":
      return [...state, action.data.anecdote];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const vote = anecdote => async dispatch => {
  const votedAnecdote = await anecdoteService.vote(anecdote);
  return dispatch({
    type: "REPLACE_ANECDOTE",
    data: { anecdote: votedAnecdote },
  });
};

export const create = content => async dispatch => {
  const addedAnecdote = await anecdoteService.create(content);
  return dispatch({
    type: "CREATE",
    data: { anecdote: addedAnecdote },
  });
};

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll();
  return dispatch({
    type: "INIT_ANECDOTES",
    data: anecdotes,
  });
};

export default reducer;
