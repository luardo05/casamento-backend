const Admin = require('../models/Admin');
const Guest = require('../models/Guest');
const Gift = require('../models/Gift');
const jwt = require('jsonwebtoken');
const CustomGift = require('../models/CustomGift');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

// 1. REGISTRAR 
const registerAdmin = async (req, res) => {
  console.log("1. Tentativa de registro iniciada.");
  console.log("2. Dados recebidos no corpo (body):", req.body);

  const { username, password } = req.body;

 
  if (!username || !password) {
    console.log("❌ Erro: Username ou password faltando.");
    return res.status(400).json({ message: 'Username e Password são obrigatórios' });
  }

  try {
    const admin = await Admin.create({ username, password });
    console.log("✅ Admin criado com sucesso ID:", admin._id);

    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.error("❌ Erro real no Mongoose:", error.message);

    res.status(400).json({ message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  console.log(`Tentativa de login para: ${username}`);

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      console.log("Login sucesso!");
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      console.log("Login falhou: Senha incorreta ou usuário não achado.");
      res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGuestsReport = async (req, res) => {
  try {
    const guests = await Guest.find({}).sort({ name: 1 });
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar convidados' });
  }
};

// const getGiftsReport = async (req, res) => {
//   try {
//     const gifts = await Gift.find({});
//     res.json(gifts);
//   } catch (error) {
//     res.status(500).json({ message: 'Erro ao buscar presentes' });
//   }
// };

const getGiftsReport = async (req, res) => {
  try {
    const standardGifts = await Gift.find({});
    const customGifts = await CustomGift.find({}).sort({ date: -1 }); // Mais recentes primeiro
    
    res.json({ standard: standardGifts, custom: customGifts });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar presentes' });
  }
};

const deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Acha o convidado
    const guest = await Guest.findById(id);
    if (!guest) return res.status(404).json({ message: 'Convidado não encontrado' });

    // 2. Remove o convidado da lista de "chosenBy" em TODOS os presentes que ele escolheu
    await Gift.updateMany(
      { "chosenBy.guestId": guest._id },
      { $pull: { chosenBy: { guestId: guest._id } } }
    );

    // 3. Remove presentes customizados (escritos) desse convidado
    await CustomGift.deleteMany({ guestId: guest._id });

    // 4. Deleta o convidado
    await Guest.findByIdAndDelete(id);

    res.json({ message: 'Convidado removido e presentes liberados!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar convidado.' });
  }
};


const resetSystem = async (req, res) => {
  try {
    // 1. Apaga todos os convidados
    await Guest.deleteMany({});
    
    // 2. Limpa o array 'chosenBy' de TODOS os presentes 
    await Gift.updateMany({}, { $set: { chosenBy: [] } });

    // 3. Apaga presentes customizados
    await CustomGift.deleteMany({});

    res.json({ message: 'Sistema resetado com sucesso! Tudo zerado.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao resetar sistema.' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getGuestsReport,
  getGiftsReport,
  deleteGuest, 
  resetSystem 
};