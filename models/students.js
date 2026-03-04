const { Value } = require('inkjs/engine/Value');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name is Required...'],
        trim: true,
        match: [/^[a-zA-Z\s]{3,50}$/, 'Name must be 3-50 characters, letters only']
    },
    email: {
        type: String,
        require: [true, 'Valid Email is required...'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        require: [true, 'Valid Password Required...'],
        minlength: [6, 'Password must be at least 6 characters'],
        maxlength: [15, 'Password must be maximum 15 characters'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, 'Password must have uppercase, lowercase and a number'],
        select: false  // never return password in queries - frontend e ante parbe na- .select('+password') diye jorr kore ante hobe...
        
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [16, 'Age must be at least 16'],
        max: [60, 'Age must be under 60']
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        enum: {
            values: ['BBA', 'MBA', 'CSE', 'EEE', 'LAW', 'ARCHITECT', 'Phd'],
            message: '{VALUE} is not a valid Department'
        }
    },
    phone: {
        type: String,
        match: [/^[0-9]{11}$/, 'Phone must be exactly 11 digits']
    },
    enrolledAt: {
        type: Date,
        default: Date.now // date.now() call kora hobe naa..
    }

}, { timestamps: true });








module.exports = mongoose.Model('Student', studentSchema)