import React from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from '../Components/TripForm.jsx';
import { useLocation } from 'react-router-dom';

function AddTrip({ onSave }) {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state?.initialData;

    const handleTripSubmit = (tripData) => {
        onSave(tripData);
        navigate('/');
    };

    return (
        <div style={{ backgroundColor: "#DEF2F1", minHeight: "100vh" }}>

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


            <div style={{ padding: '40px 20px' }}>
                <TripForm initialData={initialData} onSubmit={handleTripSubmit} />
            </div>
        </div>
    );

};





export default AddTrip;