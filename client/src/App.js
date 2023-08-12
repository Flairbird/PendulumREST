import React, { useEffect, useState } from "react";
import "./index.css";
import PendulumGenerator from "./Components/PendulumGenerator";
import PendulumContainer from "./Components/PendulumContainer";

function App() {

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
