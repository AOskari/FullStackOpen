import blogService from '../services/blogs'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (blog) => {
  return {
    content: blog,
    id: getId(),
    votes: 0
  }
}

export const vote = (data) => {
  const newBlog = {
      ...data,
      likes: data.likes + 1   
  }
  console.log(data)
  return async dispatch => {
    console.log(data.id)
    const blog = await blogService.update(data.id, newBlog)
    dispatch({
      type: 'VOTE',
      data: blog
    })
  }
}

export const newBlog = data => {
  return async dispatch => {
    const blog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const deleteBlog = data => {
  return async dispatch => {
    const blog = await blogService.remove(data)
    dispatch({
      type: 'REMOVE'
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log(blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const blogToVote = state.find(n => n.id === id)
      const votedBlog = {
        ...blogToVote,
        votes: blogToVote.votes + 1
      }
      state.sort((a, b) => (a.votes <= b.votes) ? 1 : -1)
      return state.map(blog => 
        blog.id !== id ? blog : votedBlog)        
        
    case 'NEW_BLOG':
      const newBlog = asObject(action.data)
      return state.concat(newBlog)
      
    case 'INIT_BLOGS':
      return action.data

    case 'REMOVE': 
      return state
  
    default: return state
  }


  
}

export default blogReducer