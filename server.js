require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db.js');

const PORT = process.env.PORT || 3000;

// Conecta ao banco antes de subir o servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`👉 Acesse: http://localhost:${PORT}`);
  });
});