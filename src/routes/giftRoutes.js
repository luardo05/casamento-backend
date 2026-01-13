const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');
const identifyGuest = require('../middlewares/identifyGuest');

// Rota para ver a lista de presentes
router.get('/', giftController.listGifts);

// Rota para criar presentes 
router.post('/', giftController.createGift);

// Rota para o convidado escolher o presente 
router.post('/:id/select', identifyGuest, giftController.pickGift);

// Rota para o convidado enviar presente customizado
router.post('/custom', identifyGuest, giftController.sendCustomGift);

module.exports = router;



