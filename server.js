require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express();
//const port = 5000;

const cors = require('cors');
app.use(cors()); 

// Serve static files (e.g., index.html, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
// Catch-all route to serve frontend (e.g., index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Use the connection string and port from environment variables
const uri = process.env.MONGO_URI; // Connection string from .env
const port = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Database and collection
const dbName = "healthDataDB";
const collectionName = "userMetrics";

// MongoClient connection
let client;

async function connectToDatabase() {
    try {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
app.get('/metrics', async (req, res) => {
    const collection = client.db(dbName).collection(collectionName);

    try {
        // Fetch the data for aggregated metrics
        const totalCustomers = await collection.countDocuments({});
        const userMetrics = await collection.find({}).toArray(); // Fetch all user data

        // Average Sleep Score Calculation
        const sleepScores = userMetrics.filter(user => user.sleepScore !== undefined);
        const averageSleepScore = sleepScores.length
            ? sleepScores.reduce((acc, user) => acc + user.sleepScore, 0) / sleepScores.length
            : 0;

        // Average Calories Burned
        const caloriesBurnedData = userMetrics
    .filter(user => user.caloriesBurned !== undefined) // Ensure the value exists
    .map(user => parseFloat(user.caloriesBurned)); // Convert to a number if it's a string

const averageCaloriesBurned = caloriesBurnedData.length
    ? caloriesBurnedData.reduce((acc, value) => acc + value, 0) / caloriesBurnedData.length
    : 0;


        // Average Steps Taken
        const stepsData = userMetrics.filter(user => user.steps !== undefined);
        const averageSteps = stepsData.length
            ? stepsData.reduce((acc, user) => acc + user.steps, 0) / stepsData.length
            : 0;

        // Send aggregated data as JSON
        res.json({
            totalCustomers,
            averageSleepScore: averageSleepScore.toFixed(1),
            averageCaloriesBurned: averageCaloriesBurned.toFixed(1), // Show average calories burned
            averageSteps: averageSteps.toFixed(1), // Show average steps
        });
    } catch (err) {
        console.error("Error fetching metrics:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.get('/search', async (req, res) => {
    const searchQuery = req.query.query.toLowerCase();
    const collection = client.db(dbName).collection(collectionName);

    try {
        const customer = await collection.findOne({ name: new RegExp(searchQuery, 'i') });
        if (customer) {
            res.json(customer);
        } else {
            res.status(404).json({ error: "Customer not found" });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});