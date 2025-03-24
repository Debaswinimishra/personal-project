import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState([]);
  const navigate = useNavigate();

  const checkWinner = (squares) => {
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
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return { winner: null, line: [] };
  };

  const { winner, line } = checkWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
    const { line: newLine } = checkWinner(newBoard);
    if (newLine.length > 0) {
      setWinningLine(newLine);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine([]);
  };

  const getLineStyle = (line) => {
    if (line.length === 0) return {};
    const [a, b, c] = line;
    const rowIndex = Math.floor(a / 3);
    const colIndex = a % 3;

    if (a % 3 === 0 && b % 3 === 0 && c % 3 === 0) {
      return {
        position: "absolute",
        left: `${colIndex * 33.33 + 16.5}%`,
        top: "10px",
        width: "4px",
        height: "93%",
        backgroundColor: "red",
        transform: "translateX(-50%)",
      };
    } else if (
      rowIndex === Math.floor(b / 3) &&
      rowIndex === Math.floor(c / 3)
    ) {
      return {
        position: "absolute",
        top: `${rowIndex * 33.33 + 16.5}%`,
        left: "5%",
        width: "90%",
        height: "4px",
        backgroundColor: "red",
        transform: "translateY(-50%)",
      };
    } else if (a === 0 && b === 4 && c === 8) {
      return {
        position: "absolute",
        top: "7%",
        left: "5%",
        width: "125%",
        height: "4px",
        backgroundColor: "red",
        transform: "rotate(45deg)",
        transformOrigin: "0 0",
      };
    } else if (a === 2 && b === 4 && c === 6) {
      return {
        position: "absolute",
        top: "7%",
        right: "5%",
        width: "125%",
        height: "4px",
        backgroundColor: "red",
        transform: "rotate(-45deg)",
        transformOrigin: "100% 0",
      };
    }
    return {};
  };

  return (
    <div
      style={{
        textAlign: "center",
        // marginTop: "20px",
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      }}
    >
      <h2 style={{ color: "white" }}>Tic Tac Toe</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "5px",
          justifyContent: "center",
          position: "relative",
          maxWidth: "300px",
          margin: "auto",
        }}
      >
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              border: "2px solid #000",
              fontWeight: "bold",
            }}
          >
            {cell}
          </button>
        ))}
        {winningLine.length > 0 && (
          <div style={getLineStyle(winningLine)}></div>
        )}
      </div>
      <h3 style={{ color: "white" }}>
        {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
      </h3>
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          gap: "15px", // Space between buttons
          justifyContent: "center", // Center align buttons
          flexWrap: "wrap", // Ensures responsiveness on small screens
        }}
      >
        <button
          onClick={resetGame}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            cursor: "pointer",
            background: "linear-gradient(135deg, #FF512F, #DD2476)",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Restart
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            cursor: "pointer",
            background: "linear-gradient(135deg, #11998E, #38EF7D)",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
