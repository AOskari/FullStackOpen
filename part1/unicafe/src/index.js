import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick, name}) => (
    <button onClick={onClick}>{name}</button>
)

const StatisticLine = ({text, value}) => {
    return (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad > 0){
        return (
        <div>
        <table>
            <tbody>
                <StatisticLine text="good" value={good}/>
                <StatisticLine text="neutral" value={neutral}/>
                <StatisticLine text="bad" value={bad}/>
                <StatisticLine text="all" value={good + neutral + bad}/>
            </tbody>
        </table>
        <Average good={good} neutral={neutral} bad={bad} />
        <Positive good={good} neutral={neutral} bad={bad} />  
        </div>
        )
    } else {
        return <p>No feedback given</p>
    }  
}

const Average = ({good, neutral, bad}) => {
    let avg = good + (bad * -1) / (good + neutral + bad)
    if (isNaN(avg)) {
        return <p>average 0</p>  
    } else {
        return <p>average {avg.toFixed(2)}</p>
    }    
}

const Positive = ({good, neutral, bad}) => {
    let percent = good / ((good + neutral + bad) / 100)
    if(isNaN(percent)){
        return <p>positive 0%</p>
        } else {
            return <p>positive {percent.toFixed(2)}%</p>
        }      
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = () => {
      setGood(good + 1)
   }

    const addNeutral = () => {
      setNeutral(neutral + 1)
   }
    const addBad = () => {
      setBad(bad + 1)
   }

  return (
    <div>
        <h1>give feedback</h1>
        <Button onClick={addGood} name="good" />
        <Button onClick={addNeutral} name="neutral" />
        <Button onClick={addBad} name="bad" />
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))