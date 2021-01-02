import React from 'react'

const Person = ({name, number}) => {
    
    return (
      <div>
        name: <input
        onChange={name}
        />
        <br/>
        number: <input onChange={number}/>
        <br/>
      </div>

    )
}
 
export default Person