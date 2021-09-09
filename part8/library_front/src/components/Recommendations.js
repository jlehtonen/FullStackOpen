import { useQuery } from "@apollo/client";
import { BOOKS_IN_GENRE } from "../queries";

const Recommendations = ({ loggedUser, ...props }) => {
  const booksResult = useQuery(BOOKS_IN_GENRE, {
    variables: { genre: loggedUser ? loggedUser.favoriteGenre : null },
  });

  if (!props.show || booksResult.loading || !loggedUser) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{loggedUser.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResult.data.allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
