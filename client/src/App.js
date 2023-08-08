import React, {useEffect} from "react";
import ControllerForm from "./Components/ControllerForm";


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
<ControllerForm/>
  );
}

export default App;
