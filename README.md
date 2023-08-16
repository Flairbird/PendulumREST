

# Pendulum Simulation

A dynamic, interactive pendulum simulation built with React. Users can add, modify, and remove pendulum instances, controlling various parameters such as mass, length, and initial angle as well as pause and resume the simulation intuitively.

This project offers a RESTful API for simulating the behavior of pendulums, coupled with a React front-end for visual representation and a Node.js back-end. 
It is specifically designed for updating pendulum configurations. The primary communication is established between the backend `server.js` and the React component `PendulumController.jsx` which allows users to modify pendulum attributes. These attributes are sent using an HTTP PUT request that the `server.js`  uses to calculates the positions at specified time intervals for one full cycle. The `server.js`  then responds with the list of positions as well as the time interval between each set and the `PendulumController.jsx` iterates through each set of positions in order to display an ideal frictionless simulated pendulum with a massless string.



## Directory Structure

src/
│
├── App.js               # Main app component
├── index.css            # App-wide styles
├── index.js             # App entry point
├── Slider.js            # Custom slider component
│
└── Components/
    ├── PendulumGenerator.jsx   # UI for generating pendulums
    ├── PendulumContainer.jsx  # Container for multiple pendulum instances
    ├── PendulumInstance.jsx   # Represents an individual pendulum
    ├── PendulumController.jsx # Controls and settings for a pendulum
    └── PendulumDisplay/       
        └── index.jsx          # Visual representation of a pendulum

server/
└── server.js             # Backend for the simulation


server1/
└── server1.js            # Backend for the simulation 


server2/
└── server2.js            # Backend for the simulation 


server3/
└── server3.js            # Backend for the simulation 


server4/
└── server4.js            # Backend for the simulation


## Features

-   **Add/Remove Pendulums:** Users can add up to 5 pendulums and remove them as needed.
    
-   **Control Pendulums:** For each pendulum, users can:
    
    -   Set its initial conditions like `Theta`, `Mass`, and `Length` via sliders.
    -   Control its motion with `Play`, `Pause`, and `Stop` buttons.
-   **Pendulum Display:** Each pendulum is visually represented using SVG. The simulation updates in real-time based on the set initial conditions and user interactions.
    

## Installation & Running

### Frontend

1.  Navigate to the root directory.
2.  Install the dependencies:

`npm install` 

3.  Run the React development server:

`npm start` 

The application will be available at `http://localhost:3000`.

### Backend

1.  Navigate to the `server` directory.
2.  Install the dependencies:

`npm install` 

3.  Run the server:

`node server.js` 

The server will be listening on port `5000`.

## Credits

-   Pendulum simulations use basic physics calculations for a pendulum's motion.
-   The frontend leverages the React library and ReactSlider for custom input sliders.
- Backend is powered by Node.js and Express.js, providing a RESTful API interface.
