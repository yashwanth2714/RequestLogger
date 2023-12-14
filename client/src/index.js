/*
    The index.js file serves as the entry point of the React application. It sets up the React root, imports the main
    App component, RequestContextProvider for managing request-related data, and necessary styles. The application is
    then rendered within the RequestContextProvider, ensuring centralized management of request-related data across
    components. The inclusion of font styles and custom application styles completes the setup for the entire React
    application to be rendered on the specified HTML root element.
*/


// Import the ReactDom library for rendering React components
import ReactDom from "react-dom/client";

// Import the main App component
import App from "./App";

// Import the RequestContextProvider from the context file for managing request-related data
import { RequestContextProvider } from "./context/request_context";

// Import font styles for the Roboto font family
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Import styles
import "./index.css";

// Get the root element with the id "root" from the index.html
const element = document.getElementById("root");

// Create a React root
const root = ReactDom.createRoot(element);

// Render the application within the RequestContextProvider to manage request-related data
root.render(
    <RequestContextProvider>
        {/* Render the main App component */}
        <App />
    </RequestContextProvider>
);
