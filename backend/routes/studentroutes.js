const express = require('express');
const router = express.Router();
const student = require('../models/student');

// create
router.post('/add', async (req, res) => {
  const newstudent = new student(req.body);
  await newstudent.save();
  res.send('student added');
});

// read
router.get('/view', async (req, res) => {
  const data = await student.find();
  res.json(data);
});

// update
router.put('/update/:id', async (req, res) => {
  await student.findByIdAndUpdate(req.params.id, req.body);
  res.send('student updated');
});

// delete
router.delete('/delete/:id', async (req, res) => {
  await student.findByIdAndDelete(req.params.id);
  res.send('student deleted');
});

module.exports = router;