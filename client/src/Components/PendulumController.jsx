import React, { useState, useEffect } from "react";
import Slider from "../Slider";


const PendulumController = ({ port, defaultConditions, i, updateLineProp, updateCircleProp, lineProp, circleProp }) => {
    const [initialConditions, setInitialConditions] = useState(defaultConditions);
    const [positionData, setPositionData] = useState(circleProp);
    const [dataReceived, setDataReceived] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);


    const updateConditions = (updatedConditions) => {
        setInitialConditions(previousConditions => ({ ...previousConditions, ...updatedConditions }));
    };

    const displayFunction = (receivedPositionData) => {
        const newLineProp = { x1: lineProp.x1, x2: receivedPositionData.x, y1: lineProp.y1, y2: receivedPositionData.y };
        const newCircleProp = { x: receivedPositionData.x, y: receivedPositionData.y, r: receivedPositionData.r };

        return { newLineProp, newCircleProp };
    };

    const handleAction = async (action) => {
        let payloadData = { ...initialConditions }

        if (action == 'play') {
        }
        const payload = {
            action: action,
            data: payloadData
        };

        try {
            const response = await fetch(`http://localhost:${port}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)

            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setPositionData(await response.json());

            setDataReceived(true);

        } catch (error) {
            console.error("There was an error!", error);
        }
    };


    useEffect(() => {
        if (dataReceived && positionData.length > 0) {
            const interval = setInterval(() => {
                const { newLineProp, newCircleProp } = displayFunction(positionData[currentIndex]);

                //console.log(positionData[currentIndex])
                console.log(currentIndex)

                updateLineProp(prev => ({ ...prev, ...newLineProp }));
                updateCircleProp(prev => ({ ...prev, ...newCircleProp }));

                setCurrentIndex(prevIndex => (prevIndex + 1) % positionData.length);
            }, 100);

            return () => clearInterval(interval);
        }
    }, [currentIndex, dataReceived]);

    return (
        <div>
            PendulumController
            <br />
            <span>{`Pendulum ${i + 1}`}</span>
            <br />
            <Slider minValue={-90} maxValue={90} defaultValue={defaultConditions.theta} identifier="Theta (Deg)" index={i + 1}
                updateConditions={(value) => updateConditions({ theta: value * 0.01745329251994329576923690768489, omega: 0, alpha: 0 })} />
            <br />
            <Slider minValue={5} maxValue={50} defaultValue={defaultConditions.mass} identifier="Mass (Kg)" index={i + 1}
                updateConditions={(value) => updateConditions({ mass: value })} />
            <br />
            <Slider minValue={2} maxValue={20} defaultValue={defaultConditions.length} identifier="Length (m)" index={i + 1}
                updateConditions={(value) => updateConditions({ length: value })} />
            <br />
            <button onClick={() => handleAction('play')}>Play</button>
            <button onClick={() => handleAction('pause')}>Pause</button>
            <button onClick={() => handleAction('stop')}>Stop</button>
        </div>
    );
}

export default PendulumController;