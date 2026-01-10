const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const identifyGuest = require('../middlewares/identifyGuest');

// Rota pública: Convidado preenche nome e acompanhante
router.post('/rsvp', guestController.rsvp);

router.get('/me', identifyGuest, guestController.getMyInfo);

module.exports = router;