# RequestLogger

RequestLogger is a local request logging tool using [Ngrok](https://ngrok.com/). This tool allows you to log incoming request bodies to a file and provides a user-friendly interface built with React.

[What is Ngrok and how does it work?](https://requestly.io/blog/what-is-ngrok-and-how-does-it-work/)

## Features

- **Local Logging:** Log incoming request bodies to a file for local analysis.
- **React UI:** User-friendly interface built with React for easy visualization and interaction.

## Installation

- **Downloading the Zip File:**
    1. Visit the [RequestLogger GitHub repository](https://github.com/yashwanth2714/RequestLogger).
    2. Click on the "Code" button.
    3. Select "Download ZIP" from the dropdown menu.
    4. Extract the downloaded ZIP file to your desired location.

- **Cloning the Repository (Command Line):**
    1. Alternatively, open your terminal.
    2. Navigate to the directory where you want to clone the repository
    3. Clone the repository:
        ```bash
        git clone https://github.com/yashwanth2714/RequestLogger.git
        cd RequestLogger
        ```

- **Check if npm is Working:**
   - Ensure that Node.js and npm are installed on your system.
   - Open your command prompt or terminal and run:
        ```bash
        npm -v
        ```
        This command should print the installed version of npm. If npm is not recognized, you need to download the recommended version of [Node.js](https://nodejs.org/).
   - Run the downloaded .exe file and follow the installation instructions.
   - After the installation is complete, close the current command prompt or terminal.
   - Open a new command prompt or terminal and run:
     ```bash
     npm -v
     ```
     This command should now print the installed version of npm.

- **Installing Dependencies:**
    - Once you are in the project directory, open your command prompt or terminal.
    - Run the following command to install the necessary dependencies:
        ```bash
        npm run install-all
        ```

## Usage

1. Start the server and client:

    ```bash
    npm run start
    ```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the React UI.

3. Ngrok will provide you with a public URL that you can use to expose your local server. Use this URL to make requests to your local server.

4. Incoming requests will be logged to the server(capturedLogs.txt file) and displayed on the React UI.

## Creating New Endpoints

When you create a new endpoint using the button provided on the UI, it's important to note the following:

1. **Previous Endpoint Requests:** Upon creating a new endpoint, all previous endpoint requests will be cleared from the UI. The UI will now display requests exclusively for the newly created endpoint.

2. **Server File:** While the UI will only display requests for the most recently created endpoint, all requests are still logged in the server file(capturedLogs.txt file). You can refer to the server file to view historical data for previous endpoints.

3. **Endpoint Invalidation:** The previous endpoint will no longer be accessible via the UI, and any attempts to make requests to it will result in an invalid or non-responsive state. However, the requests for the deprecated endpoint will still be available in the server file.

This behavior allows you to focus on the most recent endpoint requests in the UI while maintaining a comprehensive record of all requests in the server file.

## Configuration

- You can configure the tool by modifying the `config.js` file.

**Note:** The RequestLogger tool is configured to work by default with a provided ngrok auth token and the port number in the `config.js` file. However, it is recommended that you obtain your own ngrok auth token for extended usage. Free tokens have usage limits, and obtaining your own token allows you to have more control over your ngrok tunnel.


### Getting Ngrok Auth Token

To use RequestLogger, you will need to obtain your own ngrok auth token. Follow the steps below to get your ngrok auth token:

1. Visit the ngrok website: [https://dashboard.ngrok.com/](https://dashboard.ngrok.com/)

2. Sign in or create a new account if you don't have one.

3. Once logged in, navigate to the [Your Authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) section in the ngrok dashboard.

4. Copy the Auth Token provided on the page.

5. Open the `config.js` file in the RequestLogger project directory.

6. Replace the value for `"AUTH_TOKEN"` with your ngrok auth token.

   ```json
   {
     "AUTH_TOKEN": "your-ngrok-auth-token"
   }

### Server and React Configuration

- **Changing Server PORT:**
  If you decide to change the PORT number in the server's `config.js` file, please follow these additional steps:

  1. Open the server's `config.js` file in the RequestLogger project directory.
  
  2. Locate the `PORT` setting and update it to the desired port number.

     ```javascript
     // config.js
     module.exports = {
       PORT: 5001, // Change to your desired port number
       // otherConfigOptions...
     };

  3. Save the `config.js` file.

- **Updating React .env File:**
  If you've changed the PORT number in the server's `config.js` file, you need to update the `REACT_APP_BACKEND_URL` in the React `.env` file to match the new port. Follow these steps:

  1. Open the React `.env` file in the RequestLogger/client directory.

  2. Locate the `REACT_APP_BACKEND_URL` and update it with the new port number.

     ```dotenv
     // .env
     REACT_APP_BACKEND_URL=http://localhost:5001
     ```

  3. Save the `.env` file.

This ensures that the React frontend communicates with the correct backend URL based on the updated server configuration.

## Contributing

If you'd like to contribute to RequestLogger, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and submit a pull request.

## :star: the repo, if you like the project


https://github.com/yashwanth2714/RequestLogger/assets/36370530/b2e0d6c6-5aac-42fe-8856-d579ed95d1f1


