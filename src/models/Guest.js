const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    trim: true
  },
  plusOne: {
    type: String,
    trim: true,
    default: null 
  },
  inviteToken: {
    type: String,
    unique: true
  },
  giftsSelected: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gift'
  }],
  confirmedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Guest', guestSchema);