const Instalacao = require('../../db/model/Instalacao');

module.exports = {
  create: async (req, res) => {
    try {
      res.json(await Instalacao.create(req.body));
    } catch (err) {
      res.status(500).send(err);
    }
  },
  get: async (req, res) => {
    try {
      res.json(await Instalacao.findById(req.params.id).exec());
    } catch (err) {
      res.status(400).send(err);
    }
  },
  getAll: async (req, res) => {
    try {
      res.json(await Instalacao.find({}).populate('cliente').populate('tecnico_responsavel').exec());
    } catch (err) {
      res.status(400).send(err);
    }
  },
  update: async (req, res) => {
    try {
      const newData = {
        alterado_em: Date.now(),
        ...req.body,
      };

      res.json(await Instalacao.findByIdAndUpdate(
        req.params.id,
        { $set: newData },
        { new: true, runValidator: true },
      )).exec();
    } catch (err) {
      res.status(400).send(err);
    }
  },
  remove: async (req, res) => {
    try {
      res.send(await Instalacao.findByIdAndRemove(req.params.id).exec());
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
