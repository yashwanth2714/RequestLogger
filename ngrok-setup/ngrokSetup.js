/*
    The connection.js file exports a function, setupNgrokTunnel, which establishes an ngrok tunnel for exposing the local server
    to the internet. It utilizes the ngrok library, connects to ngrok with provided configuration settings such as port and
    authentication token, logs the public URL of the ngrok tunnel, and updates the server's endpoint in the configuration.
*/


// Import the ngrok library for setting up tunnels
const ngrok = require('ngrok');

// Import the configuration settings for the server
const config = require("../config/config");

// Asynchronous function to set up an ngrok tunnel
async function setupNgrokTunnel() {
    try {
        // Connect to ngrok, providing the port, authentication token, and disabling TLS binding
        const url = await ngrok.connect({ addr: config.PORT, authtoken: config.AUTH_TOKEN, bind_tls: false });

        // Log the public URL of the ngrok tunnel
        console.log('Ngrok Tunnel URL:', url);

        // Update the server's endpoint in the configuration with the ngrok tunnel URL
        config.ENDPOINT = url;

        // Close the ngrok tunnel when the application exits
        process.on('SIGINT', async () => {
            await ngrok.disconnect();
            process.exit();
        });
    } catch (err) {
        // Handle errors during ngrok tunnel setup and log the details
        console.error('Error creating ngrok tunnel:', err);

        // Update the configuration with the error details
        config.ERROR = err;
    }
}

// Export the setupNgrokTunnel function for use in other modules
module.exports = setupNgrokTunnel;
