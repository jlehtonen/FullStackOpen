import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const getAllGenres = books => {
  const genres = [];
  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
  });
  return genres;
};

const Books = props => {
  const result = useQuery(ALL_BOOKS);
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (!props.show || result.loading) {
    return null;
  }

  const books = result.data.allBooks;
  const filteredBooks = books.filter(book => {
    if (!selectedGenre) {
      return true;
    }

    return book.genres.includes(selectedGenre);
  });

  const genres = getAllGenres(books);

  const selectedGenreStyle = { outline: "2px solid blue" };

  return (
    <div>
      <h2>books</h2>
      {selectedGenre ? (
        <p>
          in genre <b>{selectedGenre}</b>
        </p>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button
            key={genre}
            style={selectedGenre === genre ? selectedGenreStyle : null}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
        <button
          style={!selectedGenre ? selectedGenreStyle : null}
          onClick={() => setSelectedGenre(null)}
        >
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
