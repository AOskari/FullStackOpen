const initialState = ''

export const changeMessage = (newMessage) => {
  return {
    type: 'ADD',
    data: { 
      message: newMessage
    }
  }
}

export const remove = () => {
  return {
    type: 'REMOVE'
  }
}

let timeOut;

export const newNotification = (newMessage) => {
  return async dispatch => {
    dispatch({
      type: 'ADD',
      data: { 
        message: newMessage
      }
    })
      clearTimeout(timeOut)
      console.log('cleared ', timeOut)
    timeOut = setTimeout(() => 
        dispatch({
        type: 'REMOVE'
      }), 5 * 1000)
  }
}


const messageReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'ADD':
      return action.data.message
    case 'REMOVE': 
      return state = ''
    default: return state
  }
}

export default messageReducer

    
