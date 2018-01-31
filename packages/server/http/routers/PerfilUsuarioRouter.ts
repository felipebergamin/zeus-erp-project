import { Router } from "express";
import { PerfilUsuarioController } from "../controllers/PerfilUsuarioController";

const router = Router();

router.route('/')
  .get(PerfilUsuarioController.getAll)
  .post(PerfilUsuarioController.create);

router.route('/:id')
  .get(PerfilUsuarioController.get)
  .put(PerfilUsuarioController.update)
  .delete(PerfilUsuarioController.delete);

export = router;
