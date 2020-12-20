import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const copy = [...points]

  const select = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={() => points[selected] += 1}>vote</button>
      <button onClick={select}>next anecdote</button>
      <br/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
      <p>{points[points.indexOf(Math.max(...points))]} votes</p>
    </div>
  )
}

const points = [0, 0, 0, 0, 0, 0]

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

setInterval(() => {
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root'))
}, 100)
