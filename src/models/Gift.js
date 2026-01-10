const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String, // URL da foto (pode ser link externo ou upload futuro)
    required: true
  },
  maxQuantity: {
    type: Number,
    required: true,
    default: 1
  },
  // Array que armazena quem escolheu este presente
  chosenBy: [{
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest'
    },
    guestName: String, // Nome do convidado principal
    plusOneName: String, // Nome do acompanhante (se houver)
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

giftSchema.virtual('remainingQuantity').get(function() {
  return this.maxQuantity - this.chosenBy.length;
});

module.exports = mongoose.model('Gift', giftSchema);