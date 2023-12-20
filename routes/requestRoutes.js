/*
    The "requestRoutes.js" file defines Express.js routes for handling incoming POST requests,
    managing ngrok tunnels, and providing information about the current ngrok endpoint and requests.
    It includes functionality to log incoming requests, retrieve ngrok tunnel details, and reset the ngrok tunnel
    while maintaining a record of previous requests.
*/


// Import the fs (file system) module for file-related operations
const fs = require("fs");

// Import the express and ngrok libraries for creating a server and setting up tunnels
const express = require("express");

// Import the configuration settings and the ngrok tunnel setup function
const config = require("../config/config");
const setupLocalTunnel = require("../tunnel-setup/tunnelSetup");

// Create an instance of the Express Router
const router = express.Router();

// Function to write data to a log file
function writeToLogFile(data) {
    try {
        // Append data to the specified log file asynchronously
        fs.writeFile(config.FILE_NAME, data, { flag: "a" }, (err) => {
            if (err) {
                console.log("writeToLogFile Error: ", err);
                // Send a 500 Internal Server Error response if writing to the file fails
                res.status(500).send({ Status: "Failed!" });
                return;
            }
        })
    } catch (error) {
        console.log("writeToLogFile Error: ", error);
    }
}

// POST endpoint to handle incoming requests, log them, and send a response
router.post("/", (req, res) => {
    try {
        // Create a timestamped log entry with the request body
        const date = new Date();
        const data = "\n\n" + date + " ---- " + JSON.stringify(req.body);

        // Store the request data in the configuration and write to the log file
        config.REQUESTS.push({ [date]: req.body });
        writeToLogFile(data);

        // Send a successful response to the client
        res.send({ Status: "Successful!" });
    } catch (error) {
        // Log and send a 500 Internal Server Error response if an error occurs
        console.log("Post Route Error: ",error);
        res.status(500).send({ Status: "Failed!" });
    }
});

// GET endpoint to retrieve the ngrok tunnel URL and any associated errors
router.get("/endpoint", (req, res) => {
    // Send the ngrok tunnel URL and error status as the response
    res.send({ url: config.ENDPOINT, error: config.ERROR });
});

// GET endpoint to retrieve the list of requests
router.get("/requests", (req, res) => {
    // Send the list of requests as the response
    res.send({ currentRequests: config.REQUESTS });
});

// GET endpoint to generate a new ngrok tunnel and reset the list of previous requests
router.get("/newEndpoint", async (req, res) => {
    await setupLocalTunnel();
    config.REQUESTS = [];
    res.send({ url: config.ENDPOINT, error: config.ERROR });
});

// Export the router for use in other modules
module.exports = router;
