# Express API

This repository contains a simple Express API server for handling data retrieval and storage.

## Setup

1. **Install Dependencies**: Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

2. **Set Environment Variables**: Create a `.env` file in the root directory and define your environment variables. For example:

   ```
   PORT=5000
   ```

3. **Start the Server**: Execute the following command to start the server:

   ```bash
   npm start
   ```

## Endpoints

- **GET /versions**: Retrieve versions data.
- **GET /apptext/:sex**: Retrieve application text data based on the specified sex.
- **GET /inituserdata/:version**: Retrieve initial user data for a specific version.
- **POST /visualpattern**: Save memo task data.
- **POST /userinfo**: Save user information.
- **POST /userlogtime**: Save user log time.
- **POST /usergeneraldata**: Save user general data.
- **POST /memotask-result**: Check user authorization and download memo task results.

## Dependencies

- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file into `process.env`.
- [cors](https://www.npmjs.com/package/cors): Middleware for enabling CORS with various options.
- [compression](https://www.npmjs.com/package/compression): Middleware for compressing responses.
