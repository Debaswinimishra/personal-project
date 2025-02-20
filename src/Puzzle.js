import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

function Puzzle() {
  const navigate = useNavigate();

  const cardData = [
    "❤️",
    "❤️",
    "😎",
    "😎",
    "😶‍🌫️",
    "😶‍🌫️",
    "🍜",
    "🍜",
    "🤡",
    "🤡",
    "👽",
    "👽",
    "👻",
    "👻",
    "🎁",
    "🎁",
    "🦚",
    "🦚",
  ];

  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...cardData].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setShowConfetti(false);
  };

  const handleCardClick = (index) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedIndices.includes(index)
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedIndices([...matchedIndices, firstIndex, secondIndex]);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2200);
      }
      setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (matchedIndices.length === cards.length && cards.length > 0) {
      alert("Congratulations! You matched all the cards!");
    }
  }, [matchedIndices, cards]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ff9a9e, #fad0c4)",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {showConfetti && <Confetti />}
      <h1
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "28px",
          fontWeight: "bold",
          color: "black",
          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          letterSpacing: "2px",
        }}
      >
        Matching Puzzle Game
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "10px",
          margin: "20px",
          maxWidth: "400px",
          position: "relative",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                flippedIndices.includes(index) || matchedIndices.includes(index)
                  ? "#61dafb"
                  : "#444",
              border: "2px solid #282c34",
              borderRadius: "10px",
              fontSize: "24px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s, transform 0.3s",
              width: "70px",
              height: "70px",
              position: "relative",
            }}
            onClick={() => handleCardClick(index)}
          >
            {flippedIndices.includes(index) || matchedIndices.includes(index)
              ? card
              : ""}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={shuffleCards}
          style={{
            padding: "10px 15px",
            fontSize: "14px",
            cursor: "pointer",
            backgroundColor: "#61dafb",
            border: "none",
            borderRadius: "5px",
            color: "#282c34",
            fontWeight: "bold",
            width: "120px",
          }}
        >
          Restart Game
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 15px",
            fontSize: "14px",
            cursor: "pointer",
            backgroundColor: "#61dafb",
            border: "none",
            borderRadius: "5px",
            color: "#282c34",
            fontWeight: "bold",
            width: "120px",
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Puzzle;
