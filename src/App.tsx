import './App.css';

import React from 'react';

import Grid from './Grid';
import { use2048Game } from './hooks/use2048Game';

const App: React.FC = () => {
  const { grid, score, isGameEnded, hasWon, resetGame } = use2048Game();

  return (
    <div className="App">
      <h1>2048 Game</h1>
      <div className="score-board">Score: {score}</div>
      <Grid grid={grid} />
      {isGameEnded && (
        <div className={`game-end ${hasWon ? 'win' : 'lose'}`}>
          <h2>{hasWon ? 'You Win!' : 'Game Over'}</h2>
          <p>Your final score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
