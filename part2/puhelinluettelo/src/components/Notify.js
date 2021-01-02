import React from 'react'



const Notify = ({errorMessage, errorStyle}) => {

    if (errorMessage === null) {
      return null      
    } else {
      console.log('returning message')
      return (
        <div className='error' style={errorStyle}>
            <h1>{errorMessage}</h1>
        </div>
      )
    } 
}


export default Notify