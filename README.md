# Weather API Service

This is a robust and scalable Weather API service built from the ground up using Node.js, Express, and TypeScript. It integrates with a third-party weather provider to deliver real-time weather data and features a built-in in-memory caching system to optimize performance.

While the application is designed to be production-ready and can be easily extended, please note that the Redis-based caching mechanism is currently commented out. An in-memory cache is used as a temporary replacement.

## Features

*   **Real-time Weather Data:** Fetches up-to-date weather information for any specified location.
*   **Third-Party API Integration:** Seamlessly connects to an external weather data provider.
*   **Performance-Optimized:** Includes a smart in-memory caching layer to minimize latency and reduce redundant API calls.
*   **TypeScript for Type Safety:** Enhances code quality, readability, and long-term maintainability.
*   **Robust Express Backend:** Built on the fast and minimalist Express.js framework.
*   **Asynchronous Operations:** Leverages `async/await` for efficient, non-blocking request handling.
*   **Scalable & Modular:** Organized with a clean separation of concerns (controllers, services) for easy expansion.
*   **Environment-based Configuration:** Securely manages API keys and settings through environment variables.
*   **Developer-Friendly Workflow:** Comes with `nodemon` for automatic server restarts during development.
*   **Ready for Redis:** The codebase includes a commented-out Redis integration, making it simple to switch to a more powerful distributed cache when a `redis-server` is available.
*   **Comprehensive Error Handling:** Implements robust error handling to gracefully manage and report issues.

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v20 or higher recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dibakar95/weather-app.git
cd weather-app
```

### 2. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root of your project. You will need to add the API key for your chosen third-party weather service:

```
# The port for the server to run on
PORT=8080

# Your API key from the weather data provider
WEATHER_API_KEY="YOUR_API_KEY_HERE"

# The base URL of the weather API
WEATHER_API_URL="https://api.weatherprovider.com/"
```

### 4. Running the application

**Development Mode:**

To run the application in development mode with live-reloading, use:

```bash
npm run dev
```

The server will be accessible at `http://localhost:8080` (or your configured `PORT`).

**Production Mode:**

To build and run the application for production, use:

```bash
npm run build
npm run start
```

This will compile the TypeScript code and start the production-ready server.

## API Usage

To get weather data, make a GET request to the following endpoint:

```
/api/weather/:location
```

**Example using `curl`:**

```bash
curl http://localhost:8080/api/weather/london
```

## Project Structure

The project follows a standard structure for Express applications:

```
.
├── dist/              # Compiled JavaScript output
├── node_modules/      # Project dependencies
├── src/               # TypeScript source code
│   ├── api/           # API-related files
│   │   ├── controllers/ # Request handlers
│   │   ├── routes/      # API routes
│   │   └── services/    # Business logic (e.g., API fetching)
│   ├── config/        # Configuration (e.g., Redis - commented out)
│   ├── models/        # Data models and types
│   └── index.ts       # Main application entry point
├── .env               # Environment variables (not committed)
├── .gitignore         # Files to be ignored by Git
├── package.json       # Project metadata and dependencies
├── README.md          # This file
└── tsconfig.json      # TypeScript compiler options
```

## Deployment

This service is structured for easy deployment to container-based platforms like [Google Cloud Run](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service). You will typically need to create a `Dockerfile` to containerize the application for deployment.

## TODO

*   **Implement Rate Limiting:** Add a rate limiter to the API to protect against brute-force attacks and abuse. Libraries like `express-rate-limit` can be used for this purpose.
