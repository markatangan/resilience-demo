import express from 'express';
import sampleController from '../controllers/resilienceController';

const router = express.Router();

// router.get('/resilience', sampleController.getSample);
router.post('/resilience', sampleController.createSample);

export default router;
