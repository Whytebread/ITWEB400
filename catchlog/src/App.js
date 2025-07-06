import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddTrip from "./Pages/AddTrip";

function App() {
  const [trips, setTrips] = useState([]);

  const handleTripSave = (newTrip) => {
    setTrips(prev => [...trips, newTrip]);
  };

  const handleTripEdit = (updatedTrip) => {
    setTrips((prev) =>
       prev.map((trip, i) => (i === updatedTrip.index ? updatedTrip : trip))
    );
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
