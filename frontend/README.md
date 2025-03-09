# Splash Frontend Documentation

## Overview
Splash is a web application built with Node.js for the backend and React for the frontend. This document provides an overview of the frontend structure and how to get started with development.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm start
```
This will launch the application in your default web browser at `http://localhost:3000`.

### Project Structure
- **src/**: Contains the source code for the React application.
  - **App.js**: The main component that sets up routing.
  - **components/**: Contains reusable components.
  - **pages/**: Contains the main pages of the application.
  - **styles/**: Contains CSS styles for the application.

### Building for Production
To create a production build, run:
```
npm run build
```
This will generate a `build` directory with optimized files for deployment.

## Contributing
If you would like to contribute to the project, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.