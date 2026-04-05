const mongoose = require('mongoose');

const studentschema = new mongoose.Schema({
  name: String,
  email: String,
  course: String
});

module.exports = mongoose.model('student', studentschema);