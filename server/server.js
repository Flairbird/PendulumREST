const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const PORT = 5000

app.use(cors({origin: "http://localhost:3000"}))
app.use(bodyParser.json());

app.route("/test")
.post((req, res) => {
    const payload = req.body
    const {theta,mass,length} = payload
    console.log(theta,mass,length)


    // res.send({x: theta *2, y: mass*4, z:length/2 })
    res.send({x: theta, y: mass, z:length })
})

app.route("/home")
.get((req, res) => {
    console.log("hey")
    res.send("HOME");
})


app.listen(PORT, ()=>{console.log(`Listening with port:${PORT}`)});

