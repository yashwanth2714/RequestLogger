/*
    The Endpoint component serves as a React component for displaying and managing RequestLogger endpoints.
    It utilizes React hooks, context, and Material-UI components to handle endpoint requests,
    update the displayed endpoint URL, and provide functionality for creating new endpoints.
    The component also includes error handling and a button for copying the endpoint URL to the clipboard.
*/


// Import necessary hooks from React
import { useEffect, useState, useContext, useCallback } from 'react';

// Import axiosInstance for making HTTP requests
import axiosInstance from '../../utils/axiosInstance';

// Import Material-UI components
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

// Import local components
import CopyToClipboardButton from '../Shared/CopyToClipboardButton';

// Import RequestContext from the context folder
import { RequestContext } from "../../context/request_context";

// Import CSS styles for the component
import "./Endpoint.css";

// Define endpoint URLs
const ENDPOINT_URL = '/endpoint';
const NEW_ENDPOINT_URL = '/newEndpoint';

// Functional component for the Endpoint section
function Endpoint() {
    // Destructure values from the RequestContext
    const { tunnelURL, updateTunnelURL, updateRequests } = useContext(RequestContext);
    const tooltipText = "Creating a new endpoint clears previous requests from the UI. The old endpoint becomes inaccessible, but its requests are logged in the server file (capturedLogs.txt) for reference.";

    // State for handling error messages
    const [error, setError] = useState("");

    // Function to handle endpoint requests
    const handleEndpointRequest = useCallback(async (requestURL) => {
        try {
            // Make a GET request to the specified endpoint URL
            const response = await axiosInstance.get(requestURL);

            // Destructure data from the response
            const { url, error } = response?.data;

            // If the request is successful (status code 200)
            if (response?.status === 200) {
                // Update tunnelURL and reset requests array
                updateTunnelURL(url);
                updateRequests([]);
                setError("");

                // If there is an error in the response data, set an error message
                if (error) {
                    setError("Something went wrong. Please try again!");
                }
            }
        } catch (error) {
            // Log and set error message if the request encounters an error
            console.log("Endpoint Request Error: ", error);
            setError(error.message);
        }
    }, [updateRequests, updateTunnelURL]);

    // Initial useEffect to make a request when the component mounts
    useEffect(() => {
        handleEndpointRequest(ENDPOINT_URL);
    }, [handleEndpointRequest]);

    // Function to create a new endpoint
    const createNewEndpoint = async () => {
        handleEndpointRequest(NEW_ENDPOINT_URL);
    };

    // Define content based on whether there is a tunnelURL or an error
    let content = "";

    if (tunnelURL) {
        content = (
            <>
                <div className='endpointText'>
                    <p>{tunnelURL}</p>
                    {/* Component for copying the tunnelURL to clipboard */}
                    <CopyToClipboardButton textToCopy={tunnelURL} />
                </div>
            </>
        );
    }

    if (error) {
        content = <p className='errorMessage'>{error}</p>;
    }

    // Render the Endpoint component
    return (
        <Box component="section" className='endpointSection'>
            <h2>
                Your RequestLogger Endpoint
            </h2>

            <div>
                {content}
            </div>

            {/* Button to create a new endpoint */}
            <Tooltip title={tooltipText} placement="left">
                <Button variant="contained" className='newEndpointBtn' onClick={createNewEndpoint}>
                    Create New Endpoint
                </Button>
            </Tooltip>
        </Box>
    );
}

// Export the Endpoint component as the default export
export default Endpoint;
