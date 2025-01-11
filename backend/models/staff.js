const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true, unique:true },
  location: { type: String, required: true },
  task: { type: String, required: true },
  shift: { type: String, required: true },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
