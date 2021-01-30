const initialFilter = ''

export const filterChange = (filter) => {
    return {
      type: 'SET_FILTER',
      filtered: filter
    }
  }


const filterReducer = (state = initialFilter, action) => {
    console.log('state now, ', state)
    console.log('action now ', action)
    switch (action.type) {
      case 'SET_FILTER':
        return state = state
      default:
        return state
    }
  }
  
 
  export default filterReducer
    
