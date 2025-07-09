import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddTrip from "./Pages/AddTrip";

function App() {
  const [trips, setTrips] = useState([]);

  const handleTripSave = (newTrip) => {
    fetch('http://localhost:5002/api/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTrip)
    })
      .then(res => res.JSON())
      .then(savedTrip => {
        setTrips(prev => [...trips, savedTrip]);
      })
      .catch(err => console.error("Error saving trip", err));
  };

  const handleTripEdit = (updatedTrip) => {
    fetch(`http://localhost:5002/api/trips/${updatedTrip._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTrip)
    })
      .then(res => res.json())
      .then(savedTrip => {
        setTrips(prev => prev.map(t => t._id === savedTrip._id ? savedTrip : t));
      })
      .catch(err => console.error('Error editing trip:', err));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard trips={trips} setTrips={setTrips} />} />
        <Route path="/add" element={<AddTrip onSave={handleTripSave} />} />
        <Route path="/edit" element={<AddTrip onEdit={handleTripEdit} />} />
      </Routes>
    </Router>
  );
}

export default App;
