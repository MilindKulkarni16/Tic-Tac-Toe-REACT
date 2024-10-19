import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [history, setHistory] = useState([{ board: Array(9).fill(null) }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isXNext, setIsXNext] = useState(true);

  const currentBoard = history[currentMove].board;
  const winner = calculateWinner(currentBoard);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  const handleClick = (index) => {
    if (currentBoard[index] || winner) {
      return;
    }

    const newBoard = currentBoard.slice();
    newBoard[index] = isXNext ? 'X' : 'O';

    const newHistory = history.slice(0, currentMove + 1).concat([{ board: newBoard }]);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setIsXNext(!isXNext);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setIsXNext(move % 2 === 0);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {currentBoard[index]}
    </button>
  );

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="history">
        { <h3>TIC-TAC-TOE</h3> }
        {history.map((step, move) => (
          <button key={move} onClick={() => jumpTo(move)}>
            {move === 0 ? 'Go to game start' : `Go to move #${move}`}
          </button>
        ))}
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App
