import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const dispatch = actionType => () => store.dispatch({ type: actionType });

  return (
    <div>
      <button onClick={dispatch("GOOD")}>good</button>
      <button onClick={dispatch("OK")}>neutral</button>
      <button onClick={dispatch("BAD")}>bad</button>
      <button onClick={dispatch("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
