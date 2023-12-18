/*
    The index.js file is the main entry point for the Express.js server. It sets up an ngrok tunnel using the setupNgrokTunnel
    function, initializes an Express application, configures CORS headers for cross-origin requests, parses incoming JSON requests,
    defines routes using the routes module, and starts the server to listen on the specified port from the configuration.
*/


// Import necessary modules for building the Express.js server
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

// Import the setupNgrokTunnel function from the connection module
const setupNgrokTunnel = require("./ngrok-setup/ngrokSetup");

// Create an instance of the Express application
const app = express();

// Import routes, configuration
const routes = require("./routes/requestRoutes");
const config = require("./config/config");

// Enable CORS (Cross-Origin Resource Sharing) with custom headers
app.use(cors({
    allowedHeaders: ['ngrok-skip-browser-warning', 'Content-Type'],
}));

// Parse incoming JSON requests
app.use(bodyParser.json());

// Use the defined routes for handling various endpoints
app.use("/", routes);

// Start the server, listening on the specified port from the configuration
app.listen(config.PORT, () => {
    console.log("\nServer listening on port: ", config.PORT);
    
    // Call the setupNgrokTunnel function to set up a tunnel using ngrok
    setupNgrokTunnel();
});
