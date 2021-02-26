import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Select from 'react-select'


const EDIT_AUTHOR = gql`
mutation setBorn($name: String!, $setBornTo: Int!){
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ) {
    name
    born
  }
}
`
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  const [name, setName] = useState('') 
  const [setBornTo, setBorn] = useState(0) 

  let options = []

   const [ createAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })
  
  const authors = props.authors
  console.log(authors)

  if (!props.show) {
    return null
  }

  for (let i = 0; i < authors.length; i++) {
    options = options.concat({value: authors[i].name, label: authors[i].name})
  }

  const submit = async (event) => {
    event.preventDefault()

    createAuthor({ variables: {
      name, 
      setBornTo
    } 
  })
    setName('')
    setBorn(0)
  }

  const handleChange = (e) => {
    setName(e.value)
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
        Name
          <input
            type='String'
            value={name}
            onChange={handleChange}
          />
          <br/>
          Born
          <input
            type='number'
            value={setBornTo}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
          <Select options={options} value='' onChange={handleChange}/>
          <br/>
          <button type='submit'>update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
