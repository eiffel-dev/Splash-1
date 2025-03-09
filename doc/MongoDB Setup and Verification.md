# MongoDB Setup and Verification

## Installing MongoDB on macOS

1. **Install Homebrew** (if not already installed):
    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

2. **Install MongoDB**:
    ```sh
    brew tap mongodb/brew
    brew install mongodb-community@5.0
    ```

3. **Start MongoDB**:
    ```sh
    brew services start mongodb/brew/mongodb-community
    ```

4. **Verify MongoDB is Running**:
    ```sh
    ps aux | grep -v grep | grep mongod
    ```

    You should see a process related to `mongod` if MongoDB is running.

## Using MongoDB Atlas (Cloud Service)

1. **Create a MongoDB Atlas Account**:
    Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. **Create a Cluster**:
    Follow the instructions to create a new cluster.

3. **Get the Connection String**:
    Once your cluster is created, get the connection string. It will look something like this:
    ```plaintext
    mongodb+srv://<username>:<password>@cluster0.mongodb.net/splash?retryWrites=true&w=majority
    ```

4. **Update Your [app.js](http://_vscodecontentref_/0) File**:
    Replace the local MongoDB connection string with the one from MongoDB Atlas:
    ```javascript
    // filepath: /Users/thomas/Documents/dev/Splash-1/backend/src/app.js
    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const { setRoutes } = require('./routes/index');

    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Database connection
    mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/splash?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

    // Set up routes
    setRoutes(app);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    ```

    Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

5. **Start Your Server**:
    Start your backend server again:
    ```sh
    npm start
    ```

## Troubleshooting

- If you encounter the error `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`, ensure that MongoDB is running on your local machine or that your connection string is correct.
- Use the following command to check if MongoDB is running:
    ```sh
    ps aux | grep -v grep | grep mongod
    ```

- If MongoDB is not running, start it using:
    ```sh
    brew services start mongodb/brew/mongodb-community
    ```

- If you are using MongoDB Atlas, ensure your IP whitelist includes your current IP address.
