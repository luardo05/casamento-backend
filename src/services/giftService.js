const Gift = require('../models/Gift');
const Guest = require('../models/Guest');

// Listar todos os presentes (com info de quantos restam)
const getAllGifts = async () => {
  return await Gift.find();
};

// Criar um presente (Admin)
const createGift = async (data) => {
  const gift = new Gift(data);
  return await gift.save();
};

// Convidado escolhe um presente
const selectGift = async (giftId, guest) => {
  const gift = await Gift.findById(giftId);

  if (!gift) {
    throw new Error('Presente não encontrado.');
  }

  // Verifica estoque
  if (gift.chosenBy.length >= gift.maxQuantity) {
    throw new Error('Este presente já foi totalmente escolhido por outros convidados.');
  }

  // Verifica se o convidado ja escolheu esse mesmo presente 
  const alreadyChosen = gift.chosenBy.some(item => item.guestId.toString() === guest._id.toString());
  if (alreadyChosen) {
    throw new Error('Você já selecionou este presente.');
  }

  // Monta os nomes para ficar bonito na lista do noivo
  const guestNames = guest.plusOne 
    ? `${guest.name} e ${guest.plusOne}` 
    : guest.name;

  // 1. Adiciona o convidado na lista do presente
  gift.chosenBy.push({
    guestId: guest._id,
    guestName: guest.name,
    plusOneName: guest.plusOne,
    date: new Date()
  });
  await gift.save();

  // 2. Adiciona o presente na lista do convidado (Referência cruzada)
  guest.giftsSelected.push(gift._id);
  await guest.save();

  return gift;
};

module.exports = {
  getAllGifts,
  createGift,
  selectGift
};