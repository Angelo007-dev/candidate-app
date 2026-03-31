import { Router } from "express";
import * as controller from "./candidate.controller"
const router = Router();

router.post("/create", controller.create);

router.get('/view/:id', controller.getOne);

router.put('/update/:id', controller.update);

router.delete('/delete/:id', controller.remove);

router.patch('/validate/:id', controller.validateCandidate);

router.get('/all/candidates', controller.getAll);

export default router;