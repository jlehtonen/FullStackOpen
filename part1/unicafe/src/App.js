import { useState } from "react";

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={(good - bad) / total} />
      <StatisticLine text="positive" value={`${(good * 100) / total} %`} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
