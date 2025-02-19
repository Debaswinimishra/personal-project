import React, { useState, useEffect } from "react";

function App() {
  // Card data: pairs of words
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

  // State to track opened cards and matched cards
  const [cards, setCards] = useState([]); // Shuffled cards
  const [flippedIndices, setFlippedIndices] = useState([]); // Indices of currently flipped cards
  const [matchedIndices, setMatchedIndices] = useState([]); // Indices of matched cards

  // Shuffle cards on component mount
  useEffect(() => {
    shuffleCards();
  }, []);

  // Shuffle the cards
  const shuffleCards = () => {
    const shuffled = [...cardData].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedIndices([]);
  };

  // Handle card click
  const handleCardClick = (index) => {
    // Don't allow more than 2 cards to be flipped at once
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedIndices.includes(index)
    ) {
      return;
    }

    // Flip the card
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    // Check for a match if two cards are flipped
    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        // Match found: add to matched indices
        setMatchedIndices([...matchedIndices, firstIndex, secondIndex]);
        setFlippedIndices([]);
      } else {
        // No match: flip cards back after a delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  // Check if all cards are matched
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
        backgroundColor: "#282c34",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1>Matching Puzzle Game</h1>
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
    </div>
  );
}

export default App;
