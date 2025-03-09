# Splash Project

Splash is a web application built with Node.js for the backend and React for the frontend. This project aims to provide a seamless user experience with a modern web interface and a robust server-side architecture.

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

### Backend

- **Directory**: `backend/src`
  - **app.js**: Entry point of the backend application, initializes the Express app, sets up middleware, and connects to the database.
  - **controllers/index.js**: Contains the `IndexController` class with methods for handling API requests.
  - **routes/index.js**: Defines the API routes for the application using the `IndexController`.
  - **models/index.js**: Exports data models, typically defining schemas for a database.

- **File**: `backend/package.json`
  - Configuration file for the backend Node.js application, listing dependencies, scripts, and metadata.

- **File**: `backend/README.md`
  - Documentation specific to the backend part of the application.

### Frontend

- **Directory**: `frontend/src`
  - **App.js**: Main component of the React application, sets up routing and renders the main layout.
  - **components/index.js**: Exports various reusable components used throughout the application.
  - **pages/index.js**: Exports the main pages of the application, defining the structure and layout for different routes.
  - **styles/index.css**: Contains the CSS styles for the frontend application.

- **File**: `frontend/package.json`
  - Configuration file for the frontend React application, listing dependencies, scripts, and metadata.

- **File**: `frontend/README.md`
  - Documentation specific to the frontend part of the application.

### Other Files

- **File**: `.gitignore`
  - Specifies files and directories that should be ignored by Git.

## Getting Started

To get started with the Splash project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Start the backend server:
   ```
   cd ../backend
   npm start
   ```

5. Start the frontend application:
   ```
   cd ../frontend
   npm start
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.