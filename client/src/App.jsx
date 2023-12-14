/*
    The App component serves as the main entry point of the application, rendering a Material-UI Container that
    encapsulates and organizes the display of key components. These components include Endpoint for managing API endpoints,
    RequestCodeTester for testing and showcasing request-related functionality, and RequestBodyDetails for displaying details
    of requests. This structure provides a clear organization for the main features of the application.
*/


// Import the Container component from Material-UI
import Container from '@mui/material/Container';

// Import the application components
import Endpoint from './components/Endpoint/Endpoint';
import RequestBodyDetails from './components/RequestBodyDetails/RequestBodyDetails';
import RequestCodeTester from "./components/RequestCodeTester/RequestCodeTester";

// Main App component
function App() {
    // Render the main application structure using Material-UI Container
    return (
        <Container>
            {/* Render the Endpoint component for displaying and managing API endpoints */}
            <Endpoint />

            {/* Render the RequestCodeTester component for testing and showcasing request-related functionality */}
            <RequestCodeTester />

            {/* Render the RequestBodyDetails component for displaying details of requests */}
            <RequestBodyDetails />
        </Container>
    );
}

// Export the App component as the default export
export default App;
