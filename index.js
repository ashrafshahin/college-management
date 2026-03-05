const express = require('express')

const dotenv = require('dotenv')
dotenv.config()
 
const connectDB = require('./config/db')
connectDB()

const app = express()
app.use(express.json());

const studentRoutes = require('./routes/studentRoutes')
app.use('/api/students', studentRoutes);



// port er kaj ta okay...
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    
});


