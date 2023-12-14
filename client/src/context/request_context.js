/*
    The RequestContext and RequestContextProvider form a React context that manages and provides access to
    important state related to requests. The context includes the current tunnel URL and a list of request bodies.
    The RequestContextProvider component encapsulates this context, providing functions for updating the tunnel URL and
    the list of requests. This context can be utilized by components within its provider to access and modify
    request-related information across the application.
*/


// Import necessary functions and hooks from React
import { createContext, useState, useCallback } from "react";

// Create a React context for managing request-related data
export const RequestContext = createContext();

// Define a provider component to encapsulate the context's state and functions
export function RequestContextProvider({ children }) {
    // State variables to manage tunnel URL and request bodies
    const [tunnelURL, setTunnelURL] = useState("");
    const [requests, setRequests] = useState([]);

    // Callback function to update the tunnel URL
    const updateTunnelURL = useCallback((url) => {
        setTunnelURL(url);
    }, []);

    // Callback function to update the list of request bodies
    const updateRequests = useCallback((requestBodies) => {
        setRequests(requestBodies);
    }, []);

    // Context data object containing state and update functions
    const contextData = {
        tunnelURL,
        updateTunnelURL,
        requests,
        updateRequests
    }

    // Provide the context data to the components within the provider
    return <RequestContext.Provider value={contextData}>
        {children}
    </RequestContext.Provider>
}
