import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
      }
      published
    }
  }
`;

export const UPDATE_AUTHOR_BIRTH_YEAR = gql`
  mutation updateBirthYear($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const LOGGED_USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

export const BOOKS_IN_GENRE = gql`
  query booksInGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`;
