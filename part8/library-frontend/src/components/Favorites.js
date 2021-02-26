import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, USER_FAVORITE } from './queries'

const Favorites = (props) => {

  const [searched, setSearched] = useState(false)
  let genre = ''
  const [books, setBooks] = useState([])

  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
  const userFavorite = useQuery(USER_FAVORITE)

  useEffect(() => {
    if (result.data) {
      setBooks(books.concat(result.data.allBooks))
    }
  }, [result.data])


  if (userFavorite.loading) {
    return <div>loading...</div>
  }

  genre = userFavorite.data.me.favoriteGenre

    const showBooks = () => {
      getBooks({ variables: { genreToSearch: genre } })
    }


    if (!props.show) {
      return null
    }

    if (!searched) {
      showBooks()
      setSearched(true)
    }
    

    return (
        <div>
            <h1>Recommendations</h1>
            <p>books in your favorite genre {genre}</p>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>
                    author
                  </th>
                  <th>
                    published
                  </th>
                </tr>
                {books.map(a =>
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author}</td>
                    <td>{a.published}</td>
                  </tr>
                )}
              </tbody>
          </table>
        </div>
    )
}

export default Favorites