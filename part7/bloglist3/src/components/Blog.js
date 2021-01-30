import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { vote, deleteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = (props) => {

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
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      id: props.blog.id,
      likes: props.blog.likes
    }
    props.vote(updatedBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove ${props.blog.title} by ${props.blog.author}?`)){
      console.log(props.blog.id)
      props.deleteBlog(props.blog.id)
    }
  }

  return (
    <div className='blog'>
      {props.blog.title}
      <button onClick={toggle}>{buttonText}</button>
      <br/>
      {props.blog.author}
      <div style={show} className='toggleWindow'>
        {props.blog.url}
        <br/>
        <form onSubmit={addLike}>
          {props.blog.likes} <button type='submit'>like</button>
        </form>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  vote,
  deleteBlog
}

const ConnectedBlog = connect(
  mapStateToProps, 
  mapDispatchToProps
  )(Blog)


export default ConnectedBlog
