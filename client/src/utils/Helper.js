/*
    The Helper.js file contains utility functions for common tasks related to date formatting, calculating time differences,
    and generating BML code.
*/


// Function to format a given date in a user-friendly string
export function getFormattedDate(date) {
    try {
        // Define options for formatting the date
        const options = {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };

        // Format the date using the provided options
        const formattedDate = date.toLocaleString('en-US', options);

        // Return the formatted date
        return formattedDate;
    } catch (error) {
        // Handle errors and log them
        console.log("getFormattedDate Error: ", error);
    }
}

// Function to calculate and return a human-readable time difference between a previous date and the current date
export function timeAgo(previousDate) {
    try {
        // Get the current date
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = currentDate - previousDate;

        // Calculate time in minutes, hours, and days
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        // Determine and return the appropriate time ago string
        if (minutes < 1) {
            return "A moment ago";
        } else if (minutes < 60) {
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (hours < 24) {
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
    } catch (error) {
        // Handle errors and log them
        console.log("timeAgo Error: ", error);
    }
}

// Function to generate BML code based on a given tunnel URL
export function bmlCode(tunnelURL) {
    // BML code template using the provided tunnel URL
    const code = `
requestURL = "${tunnelURL}";

restHeaderDictionary = dict("string");
put(restHeaderDictionary, "Content-Type", "application/json");

lineJson = json();
jsonput(lineJson, "_part_number", "123");
jsonput(lineJson, "unit_cost", 100);

dataJson = json();
jsonput(dataJson, "1", lineJson);

requestBody = json();
jsonput(requestBody, "title", "Sample Post Request");
jsonput(requestBody, "data", dataJson);

requestBodyStr = jsontostr(requestBody);

response = urldata(requestURL, "POST", restHeaderDictionary, requestBodyStr);
print response;
`;
    // Return the generated BML code
    return code;
}
