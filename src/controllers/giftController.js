const giftService = require('../services/giftService');
const CustomGift = require('../models/CustomGift');

// GET /api/gifts
const listGifts = async (req, res) => {
  try {
    const gifts = await giftService.getAllGifts();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar presentes.' });
  }
};

// POST /api/gifts 
const createGift = async (req, res) => {
  try {
    const gift = await giftService.createGift(req.body);
    res.status(201).json(gift);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar presente.' });
  }
};

// POST /api/gifts/:id/select
const pickGift = async (req, res) => {
  try {
    const { id } = req.params;
    // req.guest 
    const updatedGift = await giftService.selectGift(id, req.guest);

    res.json({
      message: 'Presente escolhido com sucesso!',
      gift: updatedGift
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const sendCustomGift = async (req, res) => {
  try {
    const { message } = req.body;
    const guest = req.guest; // Vem do middleware

    if (!message) return res.status(400).json({ message: 'Escreva qual é o presente.' });

    await CustomGift.create({
      guestId: guest._id,
      guestName: guest.plusOne ? `${guest.name} e ${guest.plusOne}` : guest.name,
      message
    });

    res.status(201).json({ message: 'Presente enviado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar presente.' });
  }
};
module.exports = {
  listGifts,
  createGift,
  pickGift,
  sendCustomGift
};