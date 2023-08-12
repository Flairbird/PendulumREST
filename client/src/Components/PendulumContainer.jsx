import React from "react";
import PendulumInstance from "./PendulumInstance";

const PendulumContainer = ({ pendulums }) => {

    return(
    <div style={{display:"flex", flexDirection:"column", gap:"5rem"}}>
            {pendulums.map((pendulum, index) => (
            <PendulumInstance key={index} pendulum={pendulum} index={index} />
            ))}
    </div>)
}

export default PendulumContainer