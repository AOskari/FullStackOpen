import React from 'react'

const Header = (props) => {
    return (
        <h2>{props.name}</h2>    
    )
}

const Part = (props) => {
    return (
        <p>{props.part} {props.exercise}</p>
    )
}


const Total = ({courses}) => {
    let total = courses.reduce((s, p) => s + p.exercises, 0)
    console.log(total)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

const Course = ({courses}) => {
    return (
    <div>
      <h1>Web development curriculum</h1>
        {courses.map(course => 
          <div key={course.id}> 
              <Header name={course.name} />
              {course.parts.map(names => 
                <Part key={course.parts.id} part={names.name} exercise={names.exercises}/> 
                )} 
                <Total courses={course.parts}/>    
          </div>
        )}
    </div>
    )
}

export default Course