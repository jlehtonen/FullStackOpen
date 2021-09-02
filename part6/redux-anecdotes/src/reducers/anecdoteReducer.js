import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 }
      );
    case "CREATE":
      return [...state, action.data.anecdote];
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const vote = id => {
  return {
    type: "VOTE",
    data: { id },
  };
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
