import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from './queries'


const Books = (props) => {

  const [books, setBooks] = useState([])
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
 
  let genre = []

  const showBooks = (genre) => {
    getBooks({ variables: { genreToSearch: genre } })
  }

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  const allGenres = () => {

    const genres = props.genres

    genres.map(g => {
      console.log(g)
      let length = g.genres.length
      console.log(length)
      for (let i = 0; i < length; i++) {
        if (!genre.includes(g.genres[i])) {
          genre = genre.concat(g.genres[i])
          console.log("added: ", g.genres[i])
        }
      } 
    })

    console.log("all genres now: ", genre)
    console.log("genrelist size: ", genre.length)
  }

  if (!props.show) {
    return null
  }

  allGenres()

  return (
    <div>
      <h2>books</h2>

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
      <div>
        {genre.map((g, i)=> 
          <button key={i} onClick={() => showBooks(g)}>{g}</button>
        )}
      </div>
    </div>
  )
}

export default Books