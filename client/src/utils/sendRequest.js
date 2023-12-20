/*
    The sendPostRequest module defines a function that facilitates sending a POST request to a specified API URL.
    It includes sample data (postData) representing the payload for the request. The function uses the fetch API to
    perform the HTTP request, handles errors, and returns the parsed response data.
*/


// Sample data representing the payload for a POST request
const postData = {
    title: 'Sample Post Request',
    data: {
        "1": {
            "_part_number": '123',
            "unit_cost": 100,
        }
    }
};

// Function for sending a POST request to a specified API URL
async function sendPostRequest(apiURL) {
    try {
        // Convert the postData object to a JSON string
        const requestBody = JSON.stringify(postData);

        // Define headers for the HTTP request
        const headers = {
            'Content-Type': 'application/json',
            "Bypass-Tunnel-Reminder": true
        };

        // Perform the POST request using the fetch API
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: headers,
            body: requestBody,
        });

        // Check if the response status is not OK and throw an error if necessary
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Return the parsed data
        return data;
    } catch (error) {
        // Handle errors and log the details
        console.log('sendPostRequest Error: ', error.message);

        // Return a status indicating failure
        return { Status: "Failed!" };
    }
}

// Export the sendPostRequest function as the default export
export default sendPostRequest;
