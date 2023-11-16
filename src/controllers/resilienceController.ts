import { Request, Response } from 'express';
import resilience from '../models/resilienceModel';

class SampleController {
  public async getSample(req: Request, res: Response): Promise<void> {
    try {
      const samples = await resilience.find();
      res.json(samples);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async createSample(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const sample = new resilience({ name });

    try {
      await sample.save();
      res.status(201).json(sample);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new SampleController();
