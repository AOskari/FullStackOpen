import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'


describe('Testing the blog', () => {

  test('renders title and author', () => {
    const blog = {
      title: 'Testing',
      author: 'Test author'
    }
  
    const component = render(
      <Blog blog={blog} />
    )
  
    expect(component.container).toHaveTextContent('Testing')
    expect(component.container).toHaveTextContent('Test author')
  })


  test('Clicking the view button displays url and likes', () => {
    const blog = {
      title: 'Testing',
      author: 'Test author',
      url: "testing.com",
      likes: 23
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog}/>
    )
    const button = component.getByText('view')
    button.onclick = mockHandler
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(component.container).toHaveTextContent('testing.com')
    expect(component.container).toHaveTextContent('23')
  })

  
  test('Like button gets clicked twice', () => {
    const blog = {
      title: 'Testing 2',
      author: 'Test author 2',
      url: "testing.com",
      likes: 23
    }

    const mockHandler = jest.fn()

    mockHandler.mockImplementation(event => {
      event.preventDefault()
    })

    const component = render(
      <Blog blog={blog}/>
    )
 
    const view = component.getByText('view')
    fireEvent.click(view)

    const like = component.getByText('like')
    like.onclick = mockHandler
    fireEvent.click(like)
    fireEvent.click(like)
 
    expect(mockHandler.mock.calls).toHaveLength(2)
    const div = component.container.querySelector('.toggleWindow')
    expect(div).not.toHaveStyle('display: none')
  })
  

})
