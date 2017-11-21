const router = require('express').Router();
const SignaturePlanController = require('../controllers/PlanoController');

router.route('/')
    .get(SignaturePlanController.getAll)
    .post(SignaturePlanController.create);

router.route('/:id')
    .get(SignaturePlanController.get)
    .put(SignaturePlanController.update)
    .delete(SignaturePlanController.remove);

module.exports = router;