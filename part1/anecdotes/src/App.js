import { useState } from 'react';

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];

  const [selected, setSelected] = useState(0);

  const anecdotesNumber = anecdotes.length;

  const defaultArray = new Array(anecdotesNumber + 1)
    .join('0')
    .split('')
    .map(parseFloat);

  const [vote, setVote] = useState(defaultArray);

  const getAnecdote = () => {
    const randomMax = anecdotesNumber - 1;

    const random = Math.floor(Math.random() * randomMax);

    setSelected(random);
  };

  const voteAnecdote = (selected) => {
    const newVote = vote;
    newVote[selected] = newVote[selected] + 1;
    setVote([...newVote]);
  };

  const getMostVotedAnecdote = (vote) => {
    const mostVoted = Math.max(...vote);

    const mostVotedIndex = vote.indexOf(mostVoted);

    return {
      mostVotedIndex,
      mostVoted,
    };
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>

      <p>{anecdotes[selected]}</p>

      <p>
        has {vote[selected]} vote{vote[selected] > 1 ? 's' : ''}
      </p>

      <div>
        <button onClick={() => voteAnecdote(selected)}>vote</button>

        <button onClick={() => getAnecdote()}>next anecdote</button>
      </div>

      <h2>Anecdote with most votes</h2>

      <p>{anecdotes[getMostVotedAnecdote(vote).mostVotedIndex]}</p>

      <p>
        has {vote[getMostVotedAnecdote(vote).mostVotedIndex]} vote
        {vote[getMostVotedAnecdote(vote).mostVotedIndex] > 1 ? 's' : ''}
      </p>
    </div>
  );
}

export default App;
