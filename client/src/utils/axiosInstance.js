/*
    The axiosInstance.js file exports a configured instance of the axios library, allowing for standardized HTTP requests
    to a backend server. The base URL is set using the REACT_APP_BACKEND_URL environment variable. 
    This instance can be imported and utilized throughout the application for making consistent and 
    centralized HTTP requests to the specified backend.
*/


// Import the axios library for making HTTP requests
import axios from 'axios';

// Create an instance of the axios library with a specified base URL
const instance = axios.create({
    // Set the base URL using the environment variable REACT_APP_BACKEND_URL
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Export the axios instance as the default export
export default instance;
