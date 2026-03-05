const Student = require("../models/Student");

const createStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: student
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

module.exports = { createStudent };

