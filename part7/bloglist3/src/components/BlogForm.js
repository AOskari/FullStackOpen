import React, { useState } from 'react'
import blogService from '../services/blogs'
import { newNotification } from '../reducers/messageReducer'
import { newBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }
      props.newBlog(blog)
      props.setBlogVisible(false)
      props.newNotification(`A new blog called '${title}' has been added.`)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input className='titleInput'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
        author:
          <input className='authorInput'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url:
          <input className='urlInput'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  newBlog,
  newNotification
}

const ConnectedBlogs = connect(
  mapStateToProps, 
  mapDispatchToProps
  )(BlogForm)


export default ConnectedBlogs