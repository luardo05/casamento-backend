const guestService = require('../services/guestService');

// POST /api/guests/rsvp
const rsvp = async (req, res) => {
  try {
    const { name, plusOne } = req.body;

    // Validação básica
    if (!name) {
      return res.status(400).json({ message: 'O nome do convidado é obrigatório.' });
    }

    const guest = await guestService.createGuest({ name, plusOne });

    res.status(201).json({
      message: 'Presença confirmada com sucesso!',
      token: guest.inviteToken, 
      guest: {
        id: guest._id,
        name: guest.name,
        plusOne: guest.plusOne
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao confirmar presença.' });
  }
};

// GET /api/guests/me
// Rota para verificar se o token guardado no navegador ainda é válido
// e retornar os dados do convidado (para pular a tela de RSVP)
const getMyInfo = async (req, res) => {
  res.json({
    guest: req.guest
  });
};

module.exports = {
  rsvp,
  getMyInfo
};