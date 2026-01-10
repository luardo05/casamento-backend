const Guest = require('../models/Guest');
const generateToken = require('../utils/tokenGenerator');

const createGuest = async (data) => {
  const token = generateToken();

  const newGuest = new Guest({
    name: data.name,
    plusOne: data.plusOne || null,
    inviteToken: token
  });

  return await newGuest.save();
};

const findGuestByToken = async (token) => {
  return await Guest.findOne({ inviteToken: token }).populate('giftsSelected');
};

module.exports = {
  createGuest,
  findGuestByToken
};