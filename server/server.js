const express = require("express");
const http = require('http');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

const server = http.createServer(app);
const PORT = 5000;
const updateInterval = 5;
const sendInterval = updateInterval * 10;
let positions = [{ x: 200, y: 100, r: 10 }]

const updateTheta = ({ theta, omega, alpha, length, mass }) => {
    //console.log(theta)
    deltaTime = 100
    const negativeGravity = -9.81;
    alpha = (negativeGravity / length) * Math.sin(theta);
    omega += alpha * deltaTime * 0.001;
    theta += omega * deltaTime * 0.001;


    return { theta: theta, omega, alpha, length, mass };
};

const updatePositions = ({ theta, length, mass }) => {
    const r = mass * 0.5;
    const x = 200 + (length * 10 * Math.sin(theta));
    const y = length * 10 * Math.abs(Math.cos(theta));
    return { x, y, r };
};


app.put('/', (req, res) => {
    const state = req.body.action;
    const data = req.body.data;
    switch (state) {
        case 'play':
            positions = []
            console.log("Played")
            console.log("Received Initial Conditions: ", data)
            let nextData = updateTheta(data)
            let dataBefore = updateTheta(data)
            let cycleCount = 0
            while (true) {
                if (dataBefore.omega > 0 && nextData.omega <= 0) cycleCount++
                if (dataBefore.omega < 0 && nextData.omega >= 0) cycleCount++
                dataBefore = nextData
                nextData = updateTheta(dataBefore)
                positions.push(updatePositions({ ...nextData, theta: nextData.theta }))

                if (cycleCount>1) {
                    console.log("Positions Sent: ",positions)
                    res.send(positions)
                    break;
                }
            }

            break;
        case 'pause':
            console.log("Paused")
            break;
        case 'stop':
            console.log("Stopped")
            break;
        default:
            return res.status(400).send({ error: 'Unknown state' });
    }
    //res.send({ status: 'success' });
});



server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});