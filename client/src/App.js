//import React, { useState } from "react";
import "./index.css";
import FunctionalComponent from "./Components/FunctionalComponent";
import Slider from "./Slider";

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

  return (
    // <div className="App">
    //   <Slider />
    // </div>
    <FunctionalComponent/>
  );
}

export default App;
