const { Compound } = require("../models");

exports.getCompounds = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;

  const { count, rows } = await Compound.findAndCountAll({ limit, offset });
  res.json({
    totalItems: count,
    compounds: rows,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
};

exports.getCompound = async (req, res) => {
  const compound = await Compound.findByPk(req.params.id);
  res.json(compound);
};

exports.addCompound = async (req, res) => {
  if (!req.isAdmin) return res.sendStatus(403);
  const compound = await Compound.create(req.body);
  res.json(compound);
};

exports.updateCompound = async (req, res) => {
  if (!req.isAdmin) return res.sendStatus(403);
  await Compound.update(req.body, {
    where: { id: req.params.id },
  });
  res.sendStatus(204);
};

exports.deleteCompound = async (req, res) => {
  if (!req.isAdmin) return res.sendStatus(403);
  await Compound.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
};
