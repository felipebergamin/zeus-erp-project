const ContaBancaria = require('../../db/model/ContaBancaria');

const create = async (req, res) => {
  try {
    res.json(await ContaBancaria.create(req.body));
  } catch (err) {
    res.status(400).json(err);
  }
};

const get = async (req, res) => {
  try {
    res.json(await ContaBancaria.findById(req.params.id).exec());
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    res.json(await ContaBancaria.find({}).exec());
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req, res) => {
  try {
    const newData = {
      alterado_em: Date.now(),
      ...req.body,
    };

    res.json(await ContaBancaria.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { runValidators: true },
    ).exec());
  } catch (err) {
    res.status(400).json(err);
  }
};

const remove = async (req, res) => {
  try {
    const newData = {
      excluido_em: Date.now(),
    };

    res.json(await ContaBancaria.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { runValidators: true },
    ).exec());
  } catch (err) {
    res.status(400).json(err);
  }
};


module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
};
