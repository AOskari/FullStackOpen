import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    event.preventDefault()
    const value = event.target.value
    console.log(value)
    props.filterChange(value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
  filterChange,
}

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)


export default connectedFilter