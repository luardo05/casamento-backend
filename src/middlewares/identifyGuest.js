const guestService = require('../services/guestService');

const identifyGuest = async (req, res, next) => {

  const token = req.headers['x-invite-token'];

  if (!token) {
    return res.status(401).json({ message: 'Token de convite não fornecido.' });
  }

  try {
    const guest = await guestService.findGuestByToken(token);
    
    if (!guest) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }

    req.guest = guest;
    next();
    
  } catch (error) {
    res.status(500).json({ message: 'Erro ao validar convidado.' });
  }
};

module.exports = identifyGuest;