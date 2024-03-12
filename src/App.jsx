import { useState } from "react";
import Board from "./components/board";

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const currentValue = xIsNext ? "X" : " O";
  const [status, setStatus] = useState(`Next player: ${currentValue}`);

  function changeStatus(currentSquares, currentValue) {
    console.log();
    const winner = calculateWinner(currentSquares);
    if (winner) {
      setStatus("Winner: " + winner);
    } else {
      setStatus(`Next player: ${currentValue === "X" ? "O" : "X"}`);
    }
  }

  function calculateWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handlePlay(nextSquares) {
    console.log("history = ", history);
    const nextHistory = [...history, nextSquares];
    console.log("nextHistory2 = ", nextHistory);
    console.log("nextHistory.length - 1", nextHistory.length - 1);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    let completeAll = nextHistory.length - 1 === 9;
    console.log("currentValue", currentValue);
    changeStatus(currentSquares, currentValue);

    if (completeAll) {
      setStatus("Empate");
    }
  }

  function reset(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="game">
        <div className="game-board">
          <Board
            currentValue={currentValue}
            squares={currentSquares}
            onPlay={handlePlay}
            calculateWinner={calculateWinner}
          />
        </div>
        <div className="game-info">
          <button onClick={() => reset(0)}>Reset Game</button>
        </div>
      </div>
    </>
  );
}
