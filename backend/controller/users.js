const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  const { username, password, isAdmin } = req.body;

  const prevUser = await User.findOne({ where: { username } });
  if (prevUser) return res.status(409).send("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    password: hashedPassword,
    isAdmin,
  });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send("Invalid credentials");
  const token = jwt.sign({ userId: username, isAdmin }, "secret");
  res.json({ token });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(401).send("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send("Invalid credentials");

  const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, "secret");
  res.json({ token });
};

exports.getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "username", "isAdmin"],
  });

  res.json({ users });
};

exports.updateUser = async (req, res) => {
  if (!req.isAdmin) return res.sendStatus(403);
  await User.update(req.body, { where: { id: req.params.id } });
  res.sendStatus(204);
};
