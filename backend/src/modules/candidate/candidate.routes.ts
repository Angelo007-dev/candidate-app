import { Router } from "express";
import * as controller from "./candidate.controller"
const router = Router();

router.post("/", controller.create);

router.get('/:id', controller.getOne);

router.put('/:id', controller.update);

router.delete('/:id', controller.remove);

router.patch('/:id/validate', controller.validateCandidate);

router.get('/all/candidates', controller.getAll);

export default router;