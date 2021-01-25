import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = data => {
  const anec = {
      content: data.content,
      id: data.id,
      votes: data.votes + 1   
  }
  return async dispatch => {
    console.log(data.id)
    const anecdote = await anecdoteService.update(data.id, anec)
    dispatch({
      type: 'VOTE',
      data: anec
    })
  }
}

export const newAnecdote = data => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      state.sort((a, b) => (a.votes <= b.votes) ? 1 : -1)
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : votedAnecdote)        
        
    case 'NEW_ANECDOTE':
      const newAnecdote = asObject(action.data.content)
      return state.concat(newAnecdote)
      
    case 'INIT_ANECDOTES':
      return action.data

      
      default: return state
  }


  
}

export default anecdoteReducer