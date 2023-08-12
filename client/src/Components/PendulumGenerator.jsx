import React, { useState } from "react";

const PendulumGenerator = ({ updatePendulums, pendulums }) => {
    const pendulumList = pendulums
    const pendulum = { theta: 0, mass: 10, length: 5 }

    const handleAdd = () => {

        pendulums = [...pendulumList, pendulum]
        updatePendulums(pendulums)
    };

    const handleDelete = () => {

        pendulums = pendulums.slice(0, pendulums.length - 1)
        updatePendulums(pendulums)
    };

    return (
        <div style={{display:"flex", justifyContent:"center", margin:"2rem", gap:"2rem"}}>
            <button type="submit" onClick={() => handleAdd()}>
                Add Pendulum
            </button>
            <button type="submit" onClick={() => handleDelete()}>
                Remove Pendulum
            </button>
        </div>)
}

export default PendulumGenerator