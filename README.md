The api-f1 project is a full-stack web application designed to provide comprehensive Formula 1 data, including information on current drivers, teams, and circuits. The system acts as a specialized proxy and visualization layer over the external f1api.dev data source.

The project is organized as a monorepo containing two distinct services:

Backend: A Node.js/Express API that handles data fetching from external sources, provides routing, and manages CORS policies.

Frontend: A React single-page application (SPA) built with Vite that provides a thematic user interface for browsing the F1 data.
This guide provides the necessary steps to set up the local development environment, install dependencies for both services, and launch the application.

Prerequisites
Before starting, ensure you have the following installed:

Node.js: Version 18 or higher is recommended 
backend/proyecto-apif1/node_modules/.package-lock.json
91
npm: Node Package Manager (usually bundled with Node.js).
Installation
To get the project running locally, you must install dependencies separately for the backend and the frontend.

1. Clone the Repository
git clone https://github.com/felibecerra02/api-f1.git
cd api-f1
2. Backend Setup
Navigate to the backend directory and install the required packages.

cd backend/proyecto-apif1
npm install
Sources: 
backend/proyecto-apif1/package.json
1-23

3. Frontend Setup
Navigate to the frontend directory and install the required packages.

cd ../../frontend/proyecto-apif1
npm install
Sources: 
frontend/proyecto-apif1/package.json
1-27

Running the Application
The application requires both the backend and frontend servers to be running simultaneously.

Start the Backend (Port 3000)
The backend uses nodemon to automatically restart the server when file changes are detected.

cd backend/proyecto-apif1
npm run dev
Entry Point: index.js 
backend/proyecto-apif1/package.json
7
Default Port: 3000 
backend/proyecto-apif1/index.js
33
Start the Frontend (Port 5173)
The frontend uses the Vite development server.

cd frontend/proyecto-apif1
npm run dev
Entry Point: src/main.jsx 
frontend/proyecto-apif1/src/main.jsx
1-10
Default Port: 5173 (Vite default)
