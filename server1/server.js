const express = require("express");
const http = require('http');
const WebSocket = require('ws');
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors({ origin: "http://localhost:3000" }))
app.use(bodyParser.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 5001;
const updateInterval = 10
const sendInterval = updateInterval*10

let isPlaying = false;
let clientSocket = null;

const updateTheta = (theta, omega, length, deltaT) => {
    //Equations: 
    //positive=counterclockwise
    //AngularAccel = alpha = -g/length*sin(theta)
    //AngularVeloc = omega(t1) = omega(0) + alpha * (t1-t0)
    //AngularPos = theta = theta + omega(0) * (t1-t0)

    negativeGravity = -9.81
    alpha = (negativeGravity / length) * (Math.sin(theta))
    theta = theta + (omega * deltaT * 0.001)
    omega = omega + (alpha * deltaT * 0.001)

    console.log(`Updated Alpha ${alpha}`)
    console.log(`Updated Omega ${omega}`)
    console.log(`Updated Theta ${theta}`)
    return { theta: theta, omega: omega }
}

const updateData = ({ theta, omega, length, mass }) => {
    const r = mass * 0.5
    const x2 = 200 + (length * 10 * Math.sin(theta))
    const y2 = (length * 10 * Math.abs(Math.cos(theta)))
    console.log(`Display Theta ${theta}`)
    console.log(`X2 =  ${x2}`)
    console.log(`Y2 =  ${y2}`)
    return { x2: x2, y2: y2, r: r }
}

wss.on('connection', (socket) => {

    let sendMessageInterval = null;
    socket.isActive = true;

    socket.on('message', (message) => {
        let nextData = JSON.parse(message);
        let position = { theta: nextData.theta, omega: 0, alpha: 0 };

        updateThetaInterval = setInterval(() => {

            if (!socket.isActive) {
                clearInterval(updateThetaInterval);
                return;
            }

            position = updateTheta(position.theta, position.omega, nextData.length, updateInterval);
        
        }, updateInterval);
        
        sendMessageInterval = setInterval(() => {

            if (!socket.isActive) {
                clearInterval(sendMessageInterval);
                return;
            }

            //position = updateTheta(position.theta, position.omega, nextData.length, interval);
            nextData.theta = position.theta;
            const displayLine = updateData(nextData);

            socket.send(JSON.stringify(displayLine));

        }, sendInterval);
    });

    socket.on('close', () => {
        socket.isActive = false;
    });
});

server.listen(PORT, () => { console.log(`Listening with port:${PORT}`) });
