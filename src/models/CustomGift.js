const mongoose = require('mongoose');

const customGiftSchema = new mongoose.Schema({
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
  guestName: { type: String, required: true }, // Nome para facilitar leitura
  message: { type: String, required: true },   // O que é o presente
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomGift', customGiftSchema);