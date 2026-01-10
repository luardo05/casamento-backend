const crypto = require('crypto');

// Gera uma string aleatória de 32 caracteres (ex: 'a1b2c3d4...')
const generateToken = () => {
  return crypto.randomBytes(16).toString('hex');
};

module.exports = generateToken;