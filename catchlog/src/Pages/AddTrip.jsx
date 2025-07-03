import React from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from '../Components/TripForm.jsx';

function AddTrip() {
    const navigate = useNavigate();

    const handleTripSubmit = (tripData) => {
        console.log('Trip submitted:', tripData);
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
                <TripForm onSubmit={handleTripSubmit} />
            </div>
        </div>
    );

};





export default AddTrip;