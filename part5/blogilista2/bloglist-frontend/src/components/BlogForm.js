import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({
  setErrorMessage,
  setStyle,
  setBlogVisible,
  setBlogs,
  blogs
}) => {
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
    const newestBlog = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(newestBlog)
      .then(blog => {
        setBlogs(blogs.concat(blog))
      })
    setBlogVisible(false)
    setStyle({
      backgroundColor: 'green',
      color: 'black'
    })
    setErrorMessage(`A new blog ${title} by ${author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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

export default BlogForm