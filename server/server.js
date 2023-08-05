const express = require("express");

const app = express();
const PORT = 5000




app.route("/home")
.get((req, res) => {
    res.send("HOME");
})


app.listen(PORT, ()=>{console.log(`Listening with port:${PORT}`)});

