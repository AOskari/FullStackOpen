import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Notification = () => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const message = useSelector(state => state.message)

  return (
    <div style={style}>
      {message}
    </div>
  )
}
export default Notification