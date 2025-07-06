import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddTrip from "./Pages/AddTrip";

function App() {
  const [trips, setTrips] = useState([]);

  const handleTripSave = (tripData) => {
    setTrips(prev => [...prev, tripData]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard trips={trips} />} />
        <Route path="/add" element={<AddTrip onSave={handleTripSave} />} />
      </Routes>
    </Router>
  );
}

export default App;
