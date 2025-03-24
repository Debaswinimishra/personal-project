import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    const { line: newLine, winner: newWinner } = checkWinner(newBoard);

    if (newLine.length > 0) {
      setWinningLine(newLine);
      setShowConfetti(true);

      setTimeout(() => {
        setShowPopup(true);
      }, 3000);
      setTimeout(() => setShowConfetti(false), 2000);
    } else if (!newBoard.includes(null)) {
      // Add 3-second delay for draw popup
      setTimeout(() => {
        setShowPopup(true);
      }, 3000);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine([]);
    setShowConfetti(false);
    setShowPopup(false);
  };

  const getLineStyle = (line) => {
    if (line.length === 0) return {};
    const [a, b, c] = line;

    // Check for vertical lines (columns)
    if (a % 3 === b % 3 && a % 3 === c % 3) {
      const colIndex = a % 3;
      return {
        position: "absolute",
        left: `${colIndex * 33.33 + 16.5}%`,
        top: "10px",
        width: "4px",
        height: "93%",
        backgroundColor: "red",
        transform: "translateX(-50%)",
      };
    }
    // Check for horizontal lines (rows)
    else if (
      Math.floor(a / 3) === Math.floor(b / 3) &&
      Math.floor(a / 3) === Math.floor(c / 3)
    ) {
      const rowIndex = Math.floor(a / 3);
      return {
        position: "absolute",
        top: `${rowIndex * 33.33 + 16.5}%`,
        left: "5%",
        width: "90%",
        height: "4px",
        backgroundColor: "red",
        transform: "translateY(-50%)",
      };
    }
    // Check for diagonal (top-left to bottom-right)
    else if (a === 0 && b === 4 && c === 8) {
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
    }
    // Check for diagonal (top-right to bottom-left)
    else if (a === 2 && b === 4 && c === 6) {
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
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        overflow: "hidden",
      }}
    >
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}

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
        {winner
          ? `Winner: ${winner}`
          : !board.includes(null)
          ? "Game ended in a draw!"
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </h3>
      <div
        style={{
          marginTop: "60px",
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          flexWrap: "wrap",
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

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 0 25px rgba(0,0,0,0.4)",
            zIndex: 100,
            textAlign: "center",
            width: "300px",
            maxWidth: "90%",
          }}
        >
          {winner ? (
            <>
              <h2 style={{ margin: "0 0 20px", color: "#302b63" }}>
                🎉 {winner} Wins! 🎉
              </h2>
              <button
                onClick={() => {
                  setShowPopup(false);
                  resetGame();
                }}
                style={{
                  padding: "12px 25px",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #302b63, #24243e)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Play Again
              </button>
            </>
          ) : (
            <>
              <h2 style={{ margin: "0 0 20px", color: "#302b63" }}>
                😊 It's a Draw! 😊
              </h2>
              <p style={{ marginBottom: "20px" }}>No one wins this time!</p>
              <button
                onClick={() => {
                  setShowPopup(false);
                  resetGame();
                }}
                style={{
                  padding: "12px 25px",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #FF512F, #DD2476)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                  transition: "transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Try Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
