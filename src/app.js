const express = require('express');
const cors = require('cors');

// Importação das rotas
const guestRoutes = require('./routes/guestRoutes');
const giftRoutes = require('./routes/giftRoutes'); 
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API Casamento Online 👰🤵');
});

// Definição de Rotas
app.use('/api/guests', guestRoutes);
app.use('/api/gifts', giftRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;