import React, { useState } from "react";
import PendulumController from "./PendulumController";
import PendulumDisplay from "./PendulumDisplay";

const PendulumInstance = ({ pendulum, index }) => {

const [lineProp, setLineProp] = useState({x1:200,x2:200,y1:0,y2:100})
const [circleProp, setCircleProp] = useState({x:200, y:100, r:10})

const updateLineProp = (updatedLine) => {
    setLineProp(updatedLine)
}

const updateCircleProp = (updatedCircle) => {
    setCircleProp(updatedCircle)
}

    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "3rem", height: "30vh" }}>
            <PendulumController port={5000+index} defaultConditions={pendulum} i={index} lineProp={lineProp} circleProp={circleProp} updateLineProp={updateLineProp} updateCircleProp={updateCircleProp}/>
            <PendulumDisplay lineProp={lineProp} circleProp={circleProp} />
        </div>
    )
}

export default PendulumInstance