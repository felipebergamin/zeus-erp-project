const Tecnico = require('../../db/model/Tecnico');

module.exports = {
  create: async (req, res) => {
    try {
      res.json(await Tecnico.create(req.body));
    } catch (err) {
      res.status(500).send(err);
    }
  },
  get: async (req, res) => {
    try {
      res.json(await Tecnico.findById(req.params.id).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAll: async (req, res) => {
    try {
      res.json(await Tecnico.find({}).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  },
  update: async (req, res) => {
    try {
      const values = {
        alterado_em: Date.now(),
        ...req.body,
      };

      res.json(await Tecnico.findByIdAndUpdate(
        req.params.id,
        { $set: values },
        { new: true, runValidator: true },
      ).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  },
  remove: async (req, res) => {
    try {
      res.json(await Tecnico.findByIdAndRemove(req.params.id));
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
