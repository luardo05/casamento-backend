const giftService = require('../services/giftService');

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

module.exports = {
  listGifts,
  createGift,
  pickGift
};