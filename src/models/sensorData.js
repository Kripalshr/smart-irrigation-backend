const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    default: function () {
      const now = new Date();
      return now.getHours() + ':' + now.getMinutes();
    },
  },
  moisture: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
