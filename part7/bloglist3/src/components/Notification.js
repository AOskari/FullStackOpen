import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.message)
  const style = useSelector(state => state.style)

  if (message === null) {
    return null
  }

  return (
    <div className='error' style={style}>
      {message}
    </div>
  )
}

export default Notification