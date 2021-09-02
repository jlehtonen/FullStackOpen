const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 }
      );
    case "CREATE":
      return [...state, asObject(action.data.content)];
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

export const create = content => {
  return {
    type: "CREATE",
    data: { content },
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

export default reducer;
