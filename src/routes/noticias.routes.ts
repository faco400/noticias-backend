import { Router } from 'express';
import { NoticiasController } from '../controllers/noticias.controller';

const router = Router();
const controller = new NoticiasController();

router.post('/', (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.findAll(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;
