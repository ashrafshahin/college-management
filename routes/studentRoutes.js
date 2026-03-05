const express = require('express');

const { createStudent, getStudent, getAllStudents, updateStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();


router.post('/', createStudent); 
router.get('/', getAllStudents); // sob student dekhabe
router.get('/:id', getStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);


module.exports = router;