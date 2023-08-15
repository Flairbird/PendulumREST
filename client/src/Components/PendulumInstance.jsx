import React, { useState } from "react";
import PendulumController from "./PendulumController";
import PendulumDisplay from "./PendulumDisplay";

const PendulumInstance = ({ pendulum, index }) => {


    const [lineProp, setLineProp] = useState({ x1: 210, x2: 210, y1: 0, y2: 100 })
    const [circleProp, setCircleProp] = useState({ x: 210, y: 100, r: 10 })
    const [displayProp, setdisplayProp] = useState({ x: 210, y: 100, r: 10, displayInterval: 100 })

    const updateLineProp = (updatedLine) => {
        setLineProp(updatedLine)
    }

    const updateCircleProp = (updatedCircle) => {
        setCircleProp(updatedCircle)
    }
    const updateDisplayProp = (updatedDisplay) => {
        setdisplayProp(updatedDisplay)
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "3rem", height: "30vh" }}>
            <PendulumController port={5000 + index} defaultConditions={pendulum} i={index} 
            lineProp={lineProp} circleProp={circleProp} displayProp={displayProp} 
            updateLineProp={updateLineProp} updateCircleProp={updateCircleProp} updateDisplayProp={updateDisplayProp} />
            <PendulumDisplay lineProp={lineProp} circleProp={circleProp} displayProp={displayProp} />
        </div>
    )
}

export default PendulumInstance