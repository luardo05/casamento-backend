const express = require('express');
const router = express.Router();
const { 
  registerAdmin, 
  loginAdmin, 
  getGuestsReport, 
  getGiftsReport 
} = require('../controllers/adminController');

const { protect } = require('../middlewares/authAdmin');

// Rotas Públicas (Login/Registro)
router.post('/register', registerAdmin); 
router.post('/login', loginAdmin);

router.get('/guests', protect, getGuestsReport);
router.get('/gifts', protect, getGiftsReport);

module.exports = router;