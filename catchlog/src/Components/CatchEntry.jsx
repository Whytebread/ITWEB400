import React from 'react';

//*********IMPROVEMENTS**************/
// add input focus
// add hover to buttons
// input validation

function CatchEntry({ index, catchData, onChange, onRemove }) { //props passed into catchEntry
    const handleChange = (e) => { //extracts the input data and puts it into catchData
        const { name, value } = e.target;
        onChange(index, { ...catchData, [name]: value });
    };



    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: '#f9f9f9',
            position: 'relative'
        }}>
            <h3 style={{ marginTop: 0 }}>Catch {index + 1}</h3>

            <input
                type="text"
                name="species"
                placeholder="Species"
                value={catchData.species}
                onChange={handleChange}
                style={inputStyle}
            />

            <input
                type="number"
                name="length"
                placeholder="Length (inches)"
                value={catchData.length}
                onChange={handleChange}
                style={inputStyle}
            />

            <input
                type="number"
                name="weight"
                placeholder="Weight (lbs)"
                value={catchData.weight}
                onChange={handleChange}
                style={inputStyle}
            />

            <input
                type="text"
                name="bait"
                placeholder="Worms, minnows, lure"
                value={catchData.bait}
                onChange={handleChange}
                style={inputStyle}
            />

            <button
                type="button"
                onClick={() => onRemove(index)}
                style={removeButtonStyle}
            >
                Remove
            </button>
        </div>
    );
};


const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px'
};

const removeButtonStyle = {
    backgroundColor: '#FF5C5C',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    position: 'absolute',
    right: '16px',
    top: '16px'
};

export default CatchEntry;