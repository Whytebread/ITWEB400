import React from 'react';

function TripCard({ trip, onEdit, onRequestDelete }) {
  return (
    <div style={cardStyle}>
      <h3>{trip.bodyOfWater} - {trip.catchDate}</h3>
      <p><strong>Weather:</strong> {trip.weather}</p>
      <p><strong>Notes:</strong> {trip.notes}</p>

      <div>
        <h4>Catches:</h4>
        <ul>
          {trip.catches.map((c, index) => (
            <li key={index}>
              {c.species} — {c.weight} lbs, {c.length} in, Bait: {c.bait}
            </li>
          ))}
        </ul>
      </div>

      <div style={buttonRow}>
        <button style={editButtonStyle} onClick={() => onEdit(trip)}>Edit</button>
        <button style={deleteButtonStyle} onClick={() => onRequestDelete(trip)}>Delete</button>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#FFFFFF',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  width: '100%',
  maxWidth: '350px',
};

const buttonRow = {
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px'
};

const editButtonStyle = {
  backgroundColor: '#2B7A78',
  color: '#fff',
  border: 'none',
  padding: '10px 14px',
  borderRadius: '6px',
  cursor: 'pointer'
};

const deleteButtonStyle = {
  backgroundColor: '#d9534f',
  color: '#fff',
  border: 'none',
  padding: '10px 14px',
  borderRadius: '6px',
  cursor: 'pointer'
};

export default TripCard;