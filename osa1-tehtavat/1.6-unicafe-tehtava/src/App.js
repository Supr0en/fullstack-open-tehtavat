import React, {useState} from "react";
import Button from "./Components/Button";
import Statistics from "./Components/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <h2>give feedback</h2>
        <Button text="good" handleClick = {() => setGood(good + 1)} />
        <Button text="neutral" handleClick = {() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick ={() => setBad(bad + 1)} />

        <Statistics
          goodCount={good}
          neutralCount={neutral}
          badCount={bad}
        />
    </div>
  )
};

export default App;
