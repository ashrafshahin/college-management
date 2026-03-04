const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connectDB = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB database Connected... ${connectDB.connection.host}`);
        

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // DB connection failed, 1 means unsuccessful... 0 means successful...
    }
}

module.exports = connectDB;