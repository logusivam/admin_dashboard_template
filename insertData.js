require('dotenv').config(); // Load environment variables from .env
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const uri = process.env.MONGO_URI; // Connection string from .env

// Replace with your database and collection names
const dbName = "healthDataDB";
const collectionName = "userMetrics";

// Data to insert
const userData = [
    { name: 'Alice Johnson', heartRate: 72, steps: 5000, sleepScore: 85, deviceName: 'FitPro A1', caloriesBurned: 200 },
    { name: 'Bob Smith', heartRate: 68, steps: 6200, sleepScore: 78, deviceName: 'HealthTracker X', caloriesBurned: 248 },
    { name: 'Charlie Brown', heartRate: 80, steps: 7000, sleepScore: 90, deviceName: 'SmartFit 2.0', caloriesBurned: 280 },
    { name: 'Aarav Sharma', heartRate: 78, steps: 10234, sleepScore: 92, deviceName: 'FitPro A1', caloriesBurned: 409.36 },
    { name: 'Isha Patel', heartRate: 82, steps: 6578, sleepScore: 88, deviceName: 'FitPro B2', caloriesBurned: 263.12 },
    { name: 'Ravi Kumar', heartRate: 75, steps: 8452, sleepScore: 91, deviceName: 'HealthTrack X5', caloriesBurned: 338.08 },
    { name: 'Priya Verma', heartRate: 80, steps: 9510, sleepScore: 89, deviceName: 'PulseMate P3', caloriesBurned: 380.4 },
    { name: 'Vikram Reddy', heartRate: 74, steps: 12345, sleepScore: 95, deviceName: 'WellnessTrack Z1', caloriesBurned: 493.8 },
    { name: 'Neha Desai', heartRate: 77, steps: 4321, sleepScore: 84, deviceName: 'FitPro A1', caloriesBurned: 172.84 },
    { name: 'Arjun Nair', heartRate: 70, steps: 5678, sleepScore: 90, deviceName: 'FitPro B2', caloriesBurned: 227.12 },
    { name: 'Ananya Gupta', heartRate: 73, steps: 8765, sleepScore: 86, deviceName: 'HealthTrack X5', caloriesBurned: 350.6 },
    { name: 'Siddharth Singh', heartRate: 79, steps: 10000, sleepScore: 93, deviceName: 'PulseMate P3', caloriesBurned: 400 },
    { name: 'Sneha Patel', heartRate: 68, steps: 6345, sleepScore: 91, deviceName: 'WellnessTrack Z1', caloriesBurned: 253.8 },
    { name: 'Karan Mehta', heartRate: 81, steps: 14500, sleepScore: 87, deviceName: 'FitPro A1', caloriesBurned: 580 },
    { name: 'Divya Iyer', heartRate: 76, steps: 7654, sleepScore: 89, deviceName: 'FitPro B2', caloriesBurned: 306.16 },
    { name: 'Manoj Yadav', heartRate: 72, steps: 6700, sleepScore: 85, deviceName: 'HealthTrack X5', caloriesBurned: 268 },
    { name: 'Ritika Joshi', heartRate: 83, steps: 11234, sleepScore: 94, deviceName: 'PulseMate P3', caloriesBurned: 449.36 },
    { name: 'Saurabh Rao', heartRate: 70, steps: 9000, sleepScore: 90, deviceName: 'WellnessTrack Z1', caloriesBurned: 360 },
    { name: 'Nikita Soni', heartRate: 77, steps: 4500, sleepScore: 92, deviceName: 'FitPro A1', caloriesBurned: 180 },
    { name: 'Amit Bhardwaj', heartRate: 75, steps: 12300, sleepScore: 89, deviceName: 'FitPro B2', caloriesBurned: 492 },
    { name: 'Simran Kaur', heartRate: 79, steps: 13000, sleepScore: 93, deviceName: 'HealthTrack X5', caloriesBurned: 520 },
    { name: 'Shivani Verma', heartRate: 71, steps: 8000, sleepScore: 88, deviceName: 'PulseMate P3', caloriesBurned: 320 },
    { name: 'Rahul Bhagat', heartRate: 82, steps: 10450, sleepScore: 95, deviceName: 'WellnessTrack Z1', caloriesBurned: 418 },
    { name: 'Modi Yadav', heartRate: 62, steps: 10800, sleepScore: 99, deviceName: 'Boat FitPro A1', caloriesBurned: 432 },
];

// Helper function to calculate calories burned dynamically
function calculateCaloriesBurned(steps) {
    return steps * 0.04; // Adjust factor if needed
}

// Automatically update data with calories burned
userData.forEach(user => {
    user.caloriesBurned = calculateCaloriesBurned(user.steps).toFixed(2);
});


async function insertData() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Insert the data
        const result = await collection.insertMany(userData);
        console.log(`${result.insertedCount} documents inserted successfully!`);
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        await client.close();
    }
}

// Run the function
insertData();
