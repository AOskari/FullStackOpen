import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.newAnecdote(content)
  }

    return (
        <form onSubmit={addAnecdote}>
                <h2>create new</h2>
            <input name='anecdote' />
            <button type='submit' >create</button>
        </form>
    )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
  newAnecdote,
}

const connectedForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)

export default connectedForm
