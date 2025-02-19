import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NumberMatch() {
  const [puzzle, setPuzzle] = useState([1, 2, 3, 4, 5, 6, 7, 8, null]);
  const navigate = useNavigate();

  const handleTileClick = (index) => {
    const emptyIndex = puzzle.indexOf(null);
    if (isAdjacent(index, emptyIndex)) {
      const newPuzzle = [...puzzle];
      [newPuzzle[index], newPuzzle[emptyIndex]] = [
        newPuzzle[emptyIndex],
        newPuzzle[index],
      ];
      setPuzzle(newPuzzle);
      if (isPuzzleSolved(newPuzzle)) {
        alert("Congratulations! You solved the puzzle!");
      }
    }
  };

  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 3);
    const col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3);
    const col2 = index2 % 3;
    return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
  };

  const isPuzzleSolved = (puzzle) => {
    for (let i = 0; i < puzzle.length - 1; i++) {
      if (puzzle[i] !== i + 1) return false;
    }
    return true;
  };

  const shufflePuzzle = () => {
    const shuffledPuzzle = [...puzzle];
    for (let i = shuffledPuzzle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPuzzle[i], shuffledPuzzle[j]] = [
        shuffledPuzzle[j],
        shuffledPuzzle[i],
      ];
    }
    setPuzzle(shuffledPuzzle);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #43e97b, #38f9d7)",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "36px",
          fontWeight: "bold",
          color: "black",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          letterSpacing: "2px",
        }}
      >
        Sliding Puzzle Game
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridTemplateRows: "repeat(3, 100px)",
          gap: "5px",
          margin: "20px",
        }}
      >
        {puzzle.map((tile, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: tile === null ? "transparent" : "#61dafb",
              border:
                tile === null ? "2px dashed #282c34" : "2px solid #282c34",
              fontSize: "24px",
              fontWeight: "bold",
              cursor: tile === null ? "default" : "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={() => handleTileClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={shufflePuzzle}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#61dafb",
            border: "none",
            borderRadius: "5px",
            color: "#282c34",
            fontWeight: "bold",
          }}
        >
          Shuffle
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#ff6b6b",
            border: "none",
            borderRadius: "5px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default NumberMatch;
