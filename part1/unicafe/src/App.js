import { useState } from 'react';

const Statistics = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = (good - bad) / (good + neutral + bad);
  const positive = (good * 100) / (good + neutral + bad);

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>

        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>

        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h2>statistics</h2>
      <table>
        <tr>
          <Statistics text="good" value={good} />
        </tr>

        <tr>
          <Statistics text="neutral" value={neutral} />
        </tr>

        <tr>
          <Statistics text="bad" value={bad} />
        </tr>

        <tr>
          <Statistics text="all" value={all} />
        </tr>

        <tr>
          <Statistics text="average" value={average} />
        </tr>

        <tr>
          <Statistics text="positive" value={`${positive} %`} />
        </tr>
      </table>
    </div>
  );
}

export default App;
