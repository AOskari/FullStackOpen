import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ( { blog } ) => {

  const [displayInfo, setDisplayInfo] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  const show = { display: displayInfo ? '' : 'none' }

  const toggle = () => {
    if (displayInfo) {
      setDisplayInfo(false)
      setButtonText('view')
    } else {
      setDisplayInfo(true)
      setButtonText('hide')
    }
  }

  const addLike = () => {

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    blogService
      .update(blog.id, updatedBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)){
      blogService
        .remove(blog.id)
    }
  }

  return (
    <div className='blog'>
      {blog.title}
      <button onClick={toggle}>{buttonText}</button>
      <br/>
      {blog.author}
      <div style={show} className='toggleWindow'>
        {blog.url}
        <br/>
        <form onSubmit={addLike}>
          {blog.likes} <button type='submit'>like</button>
        </form>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
