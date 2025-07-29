require('dotenv').config({path: './backend/.env'});

const uri = process.env.MONGO_URI;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
    process.exit(1);
}

// Middleware to handle errors
app.use(cors());
app.use(express.json());

// Routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    const clusterHost = new URL(uri).hostname;
    console.log(`Connected to MongoDB cluster at ${clusterHost}`);
    // Start the server after successful connection
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.error('MongoDB connection error:', err));
