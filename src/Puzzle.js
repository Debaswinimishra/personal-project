import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  ];

  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...cardData].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedIndices([]);
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
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
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
        Matching Puzzle Game
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 100px)",
          gridTemplateRows: "repeat(3, 100px)",
          gap: "10px",
          margin: "20px",
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
              transform:
                flippedIndices.includes(index) || matchedIndices.includes(index)
                  ? "rotateY(180deg)"
                  : "rotateY(0)",
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
            marginTop: "20px",
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
          Restart Game
        </button>
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "20px",
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
          Back
        </button>
      </div>
    </div>
  );
}

export default Puzzle;
