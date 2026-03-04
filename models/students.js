
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is Required...'],
        trim: true,
        match: [/^[a-zA-Z\s]{3,50}$/, 'Name must be 3-50 characters, letters only']
    },
    email: {
        type: String,
        required: [true, 'Valid Email is required...'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Valid Password Required...'],
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
    nationalId: {
        type: String,
        required: [true, 'National ID is required'],
        unique: true,
        trim: true,
        match: [/^\d{10}(\d{7})?$/, 'NID must be exactly 10 or 17 digits']
    },

    address: {
        street: {
            type: String,
            trim: true,
            maxlength: [100, 'Street cannot exceed 100 characters']
        },
        city: {
            type: String,
            trim: true,
            match: [/^[a-zA-Z\s]{2,50}$/, 'City must be letters only']
        },
        zipCode: {
            type: String,
            match: [/^\d{4,6}$/, 'Zip code must be 4-6 digits']
        },
        country: {
            type: String,
            trim: true,
            default: 'Bangladesh'
        },

    },
    photo: {
        type: String,
        default: 'default.png',
        match: [/\.(jpg|jpeg|png|webp)$/i, 'Photo must be jpg, jpeg, png or webp']
    },
    enrolledAt: {
        type: Date,
        default: Date.now // date.now() call kora hobe naa..
    }

}, { timestamps: true });

// ─── Pre-save: hash password before saving ──────────'Arrow fuction deya jabe na'──────────────
// password k protect kore with bcrypt kore...
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();

    try {
        const salt = await bcrypt.genSalt(10); // random salt korse
        this.password = await bcrypt.hash(this.password, salt); // password encrypt korche

        next();

    } catch (error) {
        next(error);
    }
});

// ─── Method: compare password at login ────────────'Arrow fuction deya jabe na'─────────
studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('Student', studentSchema)


// SAVING:
// "myPass@123"  →  bcrypt.genSalt(10)  →  bcrypt.hash()  → SAVED TO DB -> "$2a$10$..."  

// LOGIN:
// "myPass@123"  →  bcrypt.compare()  →  true / false  

// *** command to check schema is running ***
// node -e "require('./models/students'); console.log('Schema OK')"