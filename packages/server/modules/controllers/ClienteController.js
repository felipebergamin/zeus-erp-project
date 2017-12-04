const Client = require('../../db/model/Cliente');

module.exports = {
  create: async (req, res) => {
    try {
      res.json(await Client.create(req.body));
    } catch (err) {
      res.status(500).send(err);
    }
  },
  get: async (req, res) => {
    try {
      res.send(await Client.findById(req.params.id)
        .populate('signature_plan')
        .exec());
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAll: async (req, res) => {
    try {
      res.json(await Client.find({ excluido_em: { $exists: false } }).populate('plano').exec());
    } catch (err) {
      res.json(err);
    }
  },
  getRemoved: async (req, res) => {
    try {
      res.json(await Client.find({ excluido_em: { $exists: true } }).exec());
    } catch (err) {
      res.status(400).send(err);
    }
  },
  update: async (req, res) => {
    try {
      res.json(await Client.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true },
      ).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  },
  remove: async (req, res) => {
    try {
      res.send(await Client.findByIdAndUpdate(
        req.params.id,
        { $set: { excluido_em: Date.now() } },
      ).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  },
  undelete: async (req, res) => {
    try {
      const updateQuery = {
        $unset: { excluido_em: '' },
        $set: { alterado_em: Date.now() },
      };

      res.json(await Client.findByIdAndUpdate(req.params.id, updateQuery).exec());
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
