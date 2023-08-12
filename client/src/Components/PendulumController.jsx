import React, { useState } from "react";
import Slider from "../Slider";




const PendulumController = ({ defaultConditions, i }) => {

    const [initialConditions, setInitialConditions] = useState(defaultConditions)

    const updateTheta = (theta) => {
        const conditions = initialConditions
        conditions.theta = theta
        setInitialConditions(conditions)
    }

    const updateMass = (mass) => {
        const conditions = initialConditions
        conditions.mass = mass
        setInitialConditions(conditions)
    }

    const updateLength = (length) => {
        const conditions = initialConditions
        conditions.length = length
        setInitialConditions(conditions)
    }


    const handlePost = () => {
        const url = "http://localhost:5000/test";
        const data = initialConditions;
    
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Received", data)
            })
    }

    return (
        <div>PendulumController
            <br />
            <label>
                <br />
                <span>{`Pendulum ${i + 1}`}</span>
                <br />
                <br />
            </label>
            <Slider minValue={-90} maxValue={90} defaultValue={defaultConditions.theta} identifier="Theta" index={i + 1} updateCondition={updateTheta} />
            <label>
                <br />
            </label>
            <Slider minValue={1} maxValue={100} defaultValue={defaultConditions.mass} identifier="Mass" index={i + 1} updateCondition={updateMass}/>
            <label>
                <br />
            </label>
            <Slider minValue={1} maxValue={50} defaultValue={defaultConditions.length} identifier="Length" index={i + 1} updateCondition={updateLength}/>
            <br />
            <br />
            <button onClick={handlePost}>Submit</button>
        </div>)
}

export default PendulumController