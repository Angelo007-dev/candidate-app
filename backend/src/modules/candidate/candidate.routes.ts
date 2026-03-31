import { Router } from "express";
import * as controller from "./candidate.controller"
const router = Router();

router.post("/", controller.create);

router.get('/:id', controller.getOne);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

router.post('/:id/validate', controller.validate);

export default router;