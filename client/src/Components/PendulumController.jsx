import React, { useState, useEffect } from "react";
import Slider from "../Slider";

const PendulumController = ({ port, defaultConditions, i, updateLineProp, updateCircleProp, lineProp, circleProp }) => {
    const [initialConditions, setInitialConditions] = useState(defaultConditions);
    const [socket, setSocket] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);

    const updateCondition = (key, value) => {
        setInitialConditions(prev => ({ ...prev, [key]: value }));
    };

    const handleAction = (action) => {
        switch (action) {
            case 'play':
                const webSocket = new WebSocket(`ws://localhost:${port}`);

                webSocket.addEventListener('open', () => {
                    console.log('Connected to WS server');
                    const thetaInRadians = initialConditions.theta * 0.01745329251994329576923690768489; // Convert to radians
                    const payload = {
                        action: 'play',
                        data: { ...initialConditions, theta: thetaInRadians }
                    };
                    console.log(`Sending to server: ${JSON.stringify(payload)}`);
                    webSocket.send(JSON.stringify(payload));
                });

                webSocket.addEventListener('message', (event) => {
                    const data = JSON.parse(event.data);
                    console.log("Received:", data);
                    updateLineProp({ x1: lineProp.x1, x2: data.x2, y1: lineProp.y1, y2: data.y2 });
                    updateCircleProp({ x: data.x2, y: data.y2, r: data.r });
                });

                setSocket(webSocket);
                break;

            case 'pause':
                setIsPaused(!isPaused);
                socket.send(JSON.stringify({ action: 'pause' }));
                break;

            case 'resume':
                setIsPaused(!isPaused);
                const thetaInRadians = initialConditions.theta * 0.01745329251994329576923690768489; // Convert to radians
                const payload = {
                    action: 'resume',
                    data: { ...initialConditions, theta: thetaInRadians }
                };

                socket.send(JSON.stringify(payload));
                break;


            case 'stop':
                if (socket) {
                    socket.send(JSON.stringify({ action: 'stop' }));
                    socket.close();
                    setSocket(null);
                }
                break;

            default:
                break;
        }
    };

    return (
        <div>
            PendulumController
            <br />
            <span>{`Pendulum ${i + 1}`}</span>
            <br />
            <Slider minValue={-90} maxValue={90} defaultValue={defaultConditions.theta} identifier="Theta (Deg)" index={i + 1} updateCondition={(value) => updateCondition('theta', value)} />
            <br />
            <Slider minValue={5} maxValue={50} defaultValue={defaultConditions.mass} identifier="Mass (Kg)" index={i + 1} updateCondition={(value) => updateCondition('mass', value)} />
            <br />
            <Slider minValue={2} maxValue={20} defaultValue={defaultConditions.length} identifier="Length (m)" index={i + 1} updateCondition={(value) => updateCondition('length', value)} />
            <br />
            <button onClick={() => handleAction('play')}>Play</button>
            <button onClick={() => handleAction('pause')}>Pause</button>
            <button onClick={() => handleAction('resume')}>Resume</button>
            <button onClick={() => handleAction('stop')}>Stop</button>
        </div>
    );
}

export default PendulumController;