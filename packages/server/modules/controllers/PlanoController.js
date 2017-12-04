const SignaturePlan = require('../../db/model/Plano');

module.exports = {
  create: async (req, res) => {
    try {
      res.send(await SignaturePlan.create(req.body));
    } catch (err) {
      res.status(500).send(err);
    }
  },
  get: async (req, res) => {
    try {
      res.json(await SignaturePlan.findById(req.params.id).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getAll: async (req, res) => {
    try {
      res.json(await SignaturePlan.find({}).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  },
  update: async (req, res) => {
    try {
      const values = {
        alterado_em: Date.now(),
      };
      Object.assign(values, req.body);

      res.json(await SignaturePlan.findByIdAndUpdate(
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
      res.json(await SignaturePlan.findByIdAndRemove(req.params.id).exec());
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
