const Client = require('../../db/model/Cliente');

module.exports = {
    create: async (req, res)=>{
        try {
            res.json(await Client.create(req.body));
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    get: async (req, res)=>{
        try {
            res.send(
                await Client.findById(req.params.id)
                    .populate('signature_plan')
                    .exec()
            );
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    getAll: async (req, res)=>{
        try {
            res.json(await Client.find({}).exec());
        }
        catch (err) {
            res.json(err);
        }
    },
    update: async (req, res)=>{
        
        try {
            res.json(
                await Client.findByIdAndUpdate(
                    req.params.id, 
                    {$set: req.body}, 
                    {new: true, runValidators: true})
                    .exec()
            );
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    remove: async (req, res)=>{
        try {
            res.send(await Client.findByIdAndRemove(req.params.id).exec());
        } 
        catch (err) {
            res.status(500).send(err);
        }
    }
}