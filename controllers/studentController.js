const Student = require("../models/Student");

// 1 ─── Create Student ───────────────────────────────────────────────
// POST /api/students
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

// 2 ─── Get ALL Students ───────────────────────────────────────────────
// GET /api/students

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, total: students.length, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3 ─── Get Single Student ───────────────────────────────────────────
// GET /api/students/:id

const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            res.status(404).json({ success: false, message: 'Student not found...' });
        }
        res.status(200).json({ success: true, message: 'Student Found...', data: student });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4  ─── Update Student ───────────────────────────────────────────────
// PUT /api/students/:id

const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        ); 

        if (!student) {
            res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, message: 'Student Profile Updated', data: student });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 5 ─── Delete Student ───────────────────────────────────────────────
// DELETE /api/students/:id

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            res.status(404).json({ success: false, message: 'Student not found...' });
        }
        res.status(200).json({ success: true, message: 'Student Deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}






module.exports = { createStudent, getAllStudents, getStudent, updateStudent, deleteStudent };

