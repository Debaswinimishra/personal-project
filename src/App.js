import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Puzzle from "./Puzzle";
import NumberMatch from "./NumberMatch";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>WELCOME TO THE GAME ZONE</h1>
      <p style={styles.subHeading}>Choose your game to get started</p>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2503/2503383.png"
            alt="Puzzle"
            style={styles.image}
          />
          <h2 style={styles.cardTitle}>Puzzle Game</h2>
          <p style={styles.cardText}>Solve puzzles and challenge yourself.</p>
          <button style={styles.button} onClick={() => navigate("/puzzle")}>
            Play
          </button>
        </div>

        <div style={styles.card}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2910/2910764.png"
            alt="Number Match"
            style={styles.image}
          />
          <h2 style={styles.cardTitle}>Number Match</h2>
          <p style={styles.cardText}>Match numbers to win the game.</p>
          <button
            style={styles.button}
            onClick={() => navigate("/numberMatch")}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/puzzle" element={<Puzzle />} />
        <Route path="/numberMatch" element={<NumberMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(to bottom right, #8A2BE2, #00D4FF)", // Sleek gaming vibe
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  heading: {
    color: "white",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subHeading: {
    color: "white",
    fontSize: "16px",
    marginBottom: "30px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "250px",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  cardText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  image: {
    width: "50px",
    height: "50px",
    marginBottom: "10px",
  },
  button: {
    background: "linear-gradient(to bottom right, #8A2BE2, #00D4FF)",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out",
  },
};
