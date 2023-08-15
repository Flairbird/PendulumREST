import React from "react";

const PendulumDisplay = ({ lineProp, circleProp }) => {

    return (
        <div style={{ border: "2px solid #15344f", width: 420, position: "relative" }}>
            <svg width="100%" height="100%">
                <line
                    x1={lineProp.x1}
                    x2={lineProp.x2}
                    y1={lineProp.y1}
                    y2={lineProp.y2}
                    stroke="#15344f"
                    strokeWidth="2"
                />
                <circle
                    cx={circleProp.x}
                    cy={circleProp.y}
                    r={circleProp.r}
                    stroke="#007ce7"
                    strokeWidth="2"
                    fill="rgb(26, 200, 118)"
                />
            </svg>
        </div>
    );
}

export default PendulumDisplay;
