/*
    The connection.js file exports a function, setupLocalTunnel, which establishes an local tunnel for exposing the local server
    to the internet. It utilizes the localtunnel library, with provided configuration settings such as port and
    authentication token, logs the public URL of the local tunnel, and updates the server's endpoint in the configuration.
*/


// Import the localtunnel library for setting up tunnels
const localtunnel = require('localtunnel');

// Import the configuration settings for the server
const config = require("../config/config");

// Asynchronous function to set up an local tunnel
async function setupLocalTunnel() {
    try {
        // Connect to localtunnel, providing the port, authentication token, and disabling TLS binding
        const tunnel = await localtunnel({ port: config.PORT, host: "http://requestlogger.site"});

        // Log the public URL of the local tunnel
        console.log('\nLocal Tunnel URL:', tunnel.url, "\n");

        // Update the server's endpoint in the configuration with the local tunnel URL
        config.ENDPOINT = tunnel.url;


        tunnel.on('close', () => {
            console.log("close...........");
            process.exit();
            // tunnels are closed
        });
    } catch (err) {
        // Handle errors during local tunnel setup and log the details
        console.error('\nError creating local tunnel:', err);

        // Update the configuration with the error details
        config.ERROR = err;
    }
}

// Export the setupLocalTunnel function for use in other modules
module.exports = setupLocalTunnel;
