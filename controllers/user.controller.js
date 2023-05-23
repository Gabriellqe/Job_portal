const userModel = require("../models/user.model");

//create a user
const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.create({ email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { createUser, getUser };
