const BoletoBancario = require('../../db/model/BoletoBancario');

module.exports = {
    create: async (req, res)=>{
        try {
            res.json(await BoletoBancario.create(req.body));
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    get: async (req, res)=>{
        try {
            res.json(await BoletoBancario.findById(req.params.id).exec());
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    getAll: async (req, res)=>{
        try {
            res.json(await BoletoBancario.find({}).exec());
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    update: async (req, res)=>{
        try {
            res.json(
                await BoletoBancario.findByIdAndUpdate (
                    req.params.id, 
                    {$set: req.body}, 
                    {new: true, runValidator: true}
                ).exec()
            );
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    remove: async (req, res)=>{
        try {
            res.send(
                await BoletoBancario.findByIdAndRemove(req.params.id)
                    .exec()
            );
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
}