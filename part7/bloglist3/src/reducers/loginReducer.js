import React from 'react'
import loginService from '../services/login'

export const login = data => {
    return async dispatch => {
      const log = await loginService.login(data)
      dispatch({
        type: 'LOGIN',
        data: log
      })
    }
  }
  
  const loginReducer = (state = {}, action) => {

    switch(action.type) {
      case 'LOGIN':
        return state
      default: return state
    }
  }

  export default loginReducer
  