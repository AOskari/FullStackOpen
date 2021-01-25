import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/messageReducer'

const AnecdoteList = (props) => {

  const anecdotesToShow = () => {
    return props.anecdotes
  }

  const addVote = (anecdote) => {
    props.vote(anecdote)
    props.newNotification(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {anecdotesToShow().map(anecdote =>
        <div key={anecdote.id}>
          <div>
              {anecdote.content}
          </div>
          <div>
              has {anecdote.votes}
              <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
  vote,
  newNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps, 
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdotes