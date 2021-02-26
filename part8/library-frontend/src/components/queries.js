import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const USER_FAVORITE = gql`
  query {
    me {
      favoriteGenre
    }
  }
  `


export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query findBooksByGenre($genreToSearch: String!){
    allBooks(genre: $genreToSearch) {
      title
      published
    }
  }
`
export const ALL_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`