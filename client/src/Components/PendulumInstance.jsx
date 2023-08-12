import React from "react";
import PendulumController from "./PendulumController";
import PendulumDisplay from "./PendulumDisplay";

const PendulumInstance = ({ pendulum, index }) => {
    console.log(index)
    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
            <PendulumController defaultConditions={pendulum} i={index} />
            <PendulumDisplay />
        </div>
        )
}

export default PendulumInstance