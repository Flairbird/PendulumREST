const express = require("express");
const http = require('http');
const WebSocket = require('ws');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 5001;
const updateInterval = 5;
const sendInterval = updateInterval * 10;

const updateTheta = (theta, omega, alpha, length, deltaT) => {
    const negativeGravity = -9.81;
    alpha = (negativeGravity / length) * Math.sin(theta);
    omega += alpha * deltaT * 0.001;
    theta += omega * deltaT * 0.001;

    
    return { theta, omega, alpha };
};

const updateData = ({ theta, omega, length, mass }) => {
    const r = mass * 0.5;
    const x2 = 200 + (length * 10 * Math.sin(theta));
    const y2 = length * 10 * Math.abs(Math.cos(theta));
    return { x2, y2, r };
};

wss.on('connection', (socket) => {
    let updateThetaInterval, sendMessageInterval;
    let position = { theta: 0, omega: 0, alpha: 0 };

    const startIntervals = (clientData) => {
        updateThetaInterval = setInterval(() => {
            if (!socket.isPlaying) {
                clearInterval(updateThetaInterval);
                return;
            }
            position = updateTheta(position.theta, position.omega, position.alpha, clientData.data.length, updateInterval);
        }, updateInterval);

        sendMessageInterval = setInterval(() => {
            if (!socket.isPlaying) {
                clearInterval(sendMessageInterval);
                return;
            }

            const displayData = updateData({ ...clientData.data, theta: position.theta });
            socket.send(JSON.stringify(displayData));
        }, sendInterval);
    };

    socket.on('message', (message) => {
        const clientData = JSON.parse(message);
        const action = clientData.action;

        switch (action) {
            case 'play':
                socket.isPlaying = true;
                position = {
                    theta: clientData.data.theta,
                    omega: 0
                };
                startIntervals(clientData);
                break;

            case 'pause':
                socket.isPlaying = false;
                if (updateThetaInterval) clearInterval(updateThetaInterval);
                if (sendMessageInterval) clearInterval(sendMessageInterval);
                break;

            case 'resume':
                socket.isPlaying = true;
                startIntervals(clientData);
                break;

            case 'stop':
                socket.isPlaying = false;
                if (updateThetaInterval) clearInterval(updateThetaInterval);
                if (sendMessageInterval) clearInterval(sendMessageInterval);
                break;

            default:
                console.log("Unknown action:", action);
                break;
        }
    });

    socket.on('close', () => {
        socket.isPlaying = false;
        if (updateThetaInterval) clearInterval(updateThetaInterval);
        if (sendMessageInterval) clearInterval(sendMessageInterval);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});