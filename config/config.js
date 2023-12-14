/*
    The exported module represents the configuration settings for the application. It includes
    parameters such as the server port, ngrok authentication token, log file name, ngrok endpoint,
    error status, and an array to store requests. These settings provide a centralized
    configuration for various components to access and modify necessary values during the application's runtime.
*/


module.exports = {
    "PORT": 5000,   // Server port
    "AUTH_TOKEN": "2SKj5a19Qk7r7UkOQdmu5FOb0Z1_5zYUqSNZLegw4UwEwCMLC",  // Ngrok authentication token
    "FILE_NAME": "capturedLogs.txt",    // Log file name
    "ENDPOINT": "", // Current ngrok endpoint
    "ERROR": "",    // Error status
    "REQUESTS": []  // Array to store requests
}
