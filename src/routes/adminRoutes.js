const express = require('express');
const router = express.Router();
const { 
  registerAdmin, 
  loginAdmin, 
  getGuestsReport, 
  getGiftsReport,
  deleteGuest, 
  resetSystem 
} = require('../controllers/adminController');

const { protect } = require('../middlewares/authAdmin');

// Rotas Públicas (Login/Registro)
router.post('/register', registerAdmin); 
router.post('/login', loginAdmin);

router.get('/guests', protect, getGuestsReport);
router.get('/gifts', protect, getGiftsReport);

router.delete('/guests/:id', protect, deleteGuest); // Apagar um
router.delete('/reset', protect, resetSystem);      // Apagar tudo

module.exports = router;