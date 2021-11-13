import React, { useState } from 'react'

const Button = ( {handleClick, text} ) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ( {text, value} ) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ( {good, neutral, bad} ) => {
  if (good + neutral + bad === 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td>No feedback given</td>
          </tr>
        </tbody>
      </table>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine value={good} text='good' />
        <StatisticLine value={neutral} text='neutral' />
        <StatisticLine value={bad} text='bad' />
        <StatisticLine value={good + neutral + bad} text='all' />
        <StatisticLine value={ (good * 1 + neutral * 0 + bad * (-1)) / (good + neutral + bad) } text='average' />
        <StatisticLine value={good / (good + neutral + bad) * 100 + " %"} text='positive' />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App