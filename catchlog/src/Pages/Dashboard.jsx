import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const trips = []; //will hold trip card data but will start empty if no trips logged


  return (
    <div style={{ backgroundColor: "#DEF2F1", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{
        backgroundColor: "#2B7A78",
        padding: "16px 24px",
        color: "white"
      }}>
        <h1 style={{
          margin: 0,
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          CatchLog
        </h1>
      </header>

      {/* If no trips are logged, a display reflects this */}
      {trips.length === 0 ? (
        <main style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '40px'
        }}>

          <h2 style={{ color: "#2B7A78" }}>No Trips Yet</h2>
          <div style={{ fontSize: "60px" }}>🎣</div>
          <p style={{ color: "#555" }}>Start logging your fishing adventures to build your CatchLog history</p>

          {/* Button to go to the Add Trip page */}
          <Link to="/add">
            <button style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: "#3AAFA9",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer"
            }}>
              + New Trip
            </button>
          </Link>
        </main>

      ) : (
        <div>
          {/* loop through trips and display each */}
          <p>You have {trips.length} trips logged.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;