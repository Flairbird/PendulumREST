import React, { useEffect, useState } from "react";
import "./index.css";
import PendulumGenerator from "./Components/PendulumGenerator";
import PendulumContainer from "./Components/PendulumContainer";

function App() {
  //   useEffect(() => {

  //     const url = "http://localhost:5000/test";
  //     const data = { theta: "45", mass: "10", length: "10"};

  // fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log("Received",data)
  //   })
  //   },[])


  const [pendulums, setPendulums] = useState([])

  const updatePendulums = (updatedPendulums) => {
    setPendulums(updatedPendulums);
  }

  return (
    <div className="App">
      <PendulumGenerator updatePendulums={updatePendulums} pendulums={pendulums}/>
      <PendulumContainer pendulums={pendulums} />
    </div>
  );
}

export default App;
