import { useState, useEffect } from 'react';

const App = () => {
  const [anecdote, setAnecdote] = useState('');
  const [anecdotes, setAnecdotes] = useState([
    {
      id: 0,
      text: 'If it hurts, do it more often.',
      voteCount: 0
    },
    {
      id: 1,
      text: 'Adding manpower to a late software project makes it later!',
      voteCount: 0
    },
    {
      id: 2,
      text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      voteCount: 0
    },
    {
      id: 3,
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      voteCount: 0
    },
    {
      id: 4,
      text: 'Premature optimization is the root of all evil.',
      voteCount: 0
    },
    {
      id: 5,
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      voteCount: 0
    },
    {
      id: 6,
      text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
      voteCount: 0
    }
  ]);

  const getRandomAnec = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setAnecdote(anecdotes[random]);
  };

  const addVotes = () => {
    const curAnecdote = anecdotes.find(anec => anec.id === anecdote.id);
      curAnecdote.voteCount++;

      setAnecdotes([...anecdotes]);
      setAnecdote(curAnecdote);
  }

  const maxVotes = Math.max(...anecdotes.map(anec => anec.voteCount));
  const mostVoted = anecdotes.find(anec => anec.voteCount === maxVotes); 

  useEffect(() => {
    getRandomAnec();
  }, []);

  return (
    <div>
        <h2>{anecdote.text}</h2>
        <h2>Has {anecdote.voteCount} votes</h2>
        <button onClick={ addVotes }>Vote</button>
        <button onClick={ getRandomAnec }>next anecdote</button>
        
        {mostVoted.voteCount > 0 && (
          <>
            <p>{mostVoted.text}</p>
            <p>has {mostVoted.voteCount} votes</p>
          </>
        )}
    </div>
  );
}

export default App;