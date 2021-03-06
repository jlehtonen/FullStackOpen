import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import { LOGGED_USER, BOOK_ADDED, ALL_BOOKS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const loggedUserResult = useQuery(LOGGED_USER);

  useEffect(() => {
    const tokenFromLocalstorage = localStorage.getItem("library-user-token");
    if (tokenFromLocalstorage) {
      setToken(tokenFromLocalstorage);
    }
  }, []);

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => set.map(elem => elem.id).includes(object.id);
    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: [...dataInStore.allBooks, addedBook] },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      window.alert(`The book '${book.title}' by ${book.author.name} was added`);
      updateCacheWith(book);
    },
  });

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (loggedUserResult.loading) {
    return null;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} loggedUser={loggedUserResult.data.me} />

      <Login show={page === "login"} setToken={setToken} />

      <Recommendations
        show={page === "recommend"}
        loggedUser={loggedUserResult.data.me}
      />
    </div>
  );
};

export default App;
