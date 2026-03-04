const express = require('express')
const dotenv = require('dotenv')


// Load .env variables
dotenv.config()

// database connection 
const connectDB = require('./config/db')
connectDB()

const app = express()

// Middleware to parse JSON
app.use(express.json());



// port er kaj ta okay...
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    
})


