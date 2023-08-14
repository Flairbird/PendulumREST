import React, { useState } from "react";

const Modal = ({ show, onClose }) => {
    return (
        <div style={{
            display: show ? 'block' : 'none',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '1rem',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)'
        }}>
            You can only have a maximum of 5 pendulums.
            <button onClick={onClose}>Close</button>
        </div>
    );
}

const PendulumGenerator = ({ updatePendulums, pendulums }) => {
    const [showModal, setShowModal] = useState(false);

    const handleAdd = () => {
        if (pendulums.length >= 5) {
            setShowModal(true);
        } else {
            const newPendulum = { theta: 0, mass: 20, length: 10 };
            const newPendulums = [...pendulums, newPendulum];
            updatePendulums(newPendulums);
        }
    };

    const handleDelete = () => {
        const newPendulums = pendulums.slice(0, pendulums.length - 1);
        updatePendulums(newPendulums);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem", gap: "2rem" }}>
            <button type="submit" onClick={handleAdd}>
                Add Pendulum
            </button>
            <button type="submit" onClick={handleDelete}>
                Remove Pendulum
            </button>
            <Modal show={showModal} onClose={() => setShowModal(false)} />
        </div>
    )
}

export default PendulumGenerator;