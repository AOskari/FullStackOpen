import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm updates parent state and calls onSubmit', () => {

  const createBlog = jest.fn()

  const component = render(
    <BlogForm   
    setErrorMessage={createBlog}
    setStyle={createBlog}
    setBlogVisible={createBlog}
    setBlogs={createBlog}
    blogs={createBlog}
    />
  )

  const input = component.container.querySelector('.titleInput')
  const form = component.container.querySelector('form')

  fireEvent.change(input, { 
    target: { value: 'testing the form' } 
  })
  fireEvent.submit(form)

  expect(input.value).toBe('testing the form')
})