import React from "react";
import Slider from "../Slider";

const PendulumController = ({ defaultConditions, i }) => {
    return (
        <div>PendulumController
            <br />
            <label>
                <br />
                <span>{`Pendulum ${i + 1}`}</span>
                <br />
                <br />
            </label>
            <Slider minValue={-90} maxValue={90} defaultValue={defaultConditions.theta} identifier="Theta" index={i + 1} />
            <label>
                <br />
            </label>
            <Slider minValue={1} maxValue={100} defaultValue={defaultConditions.mass} identifier="Mass" index={i + 1} />
            <label>
                <br />
            </label>
            <Slider minValue={1} maxValue={50} defaultValue={defaultConditions.length} identifier="Length" index={i + 1} />
        </div>)
}

export default PendulumController