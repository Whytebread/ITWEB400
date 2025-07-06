import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TripCard from '../Components/TripCard';
import Modal from '../Components/Modal';
import { useNavigate } from 'react-router-dom';

// ********IMPROVEMENTS/CHANGES*********//
// need to have add trip button show if there are no trip cards populated

function Dashboard() {

  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [tripToEdit, setTripToEdit] = useState(null);

  // shows the modal to confirm delete when delete button is clicked
  const handleRequestDelete = (trip) => {
  setTripToDelete(trip);
  setShowModal(true);
};

// deletes the trip data shown in the card when the confirm delete button is clicked
const confirmDelete = () => {
  setTrips(prevTrips => prevTrips.filter(t => t !== tripToDelete));
  setTripToDelete(null);
  setShowModal(false);
};

// cancels the delete action and closes the modal
const cancelDelete = () => {
  setTripToDelete(null);
  setShowModal(false);
};

// passes the trip data and allows editing in the tripForm component
const handleEdit = (trip, index) => {
  Navigate("/edit", { state: { initialData: { ...trip, index } } });
};

// allows navigation to the add trip page after the edit button is clicked
const Navigate = useNavigate();

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

          <div style= {cardGridStyle}>
          {trips.map((trip, index) => (
            <TripCard
              key={index}
              trip={trip}
              onEdit={() => {
                setTripToEdit(trip);
                Navigate('/add', {state: {initialData: trip } });
               }}
              onRequestDelete={handleRequestDelete}
            />
          ))}
          </div>

          <p>You have {trips.length} trips logged.</p>

          {showModal && (
            <Modal
              message="Are you sure you want to delete this trip? This action cannot be undone. Are you sure you want to continue?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      )}
    </div>
  );
}

// card layout

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
  padding: '20px',
  justifyItems: 'center',
};
export default Dashboard;