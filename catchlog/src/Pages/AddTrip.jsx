import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TripForm from '../Components/TripForm.jsx';

function AddTrip({ onSave, onEdit }) {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state?.initialData;

    const handleTripSubmit = (tripData) => {
        if (initialData && initialData.index !== undefined) {
            
            onEdit({ ...tripData, index: initialData.index });
        } else {
            
            onSave(tripData);
        }
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