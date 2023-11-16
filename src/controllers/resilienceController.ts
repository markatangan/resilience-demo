import { Request, Response } from 'express';
import message from '../models/resilienceModel';

export interface messageParams {
  to: string;
  from: string;
  body: string;
}
class SampleController {
  // public async getSample(req: Request, res: Response): Promise<void> {
  //   try {
  //     const samples = await message.find();
  //     res.json(samples);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }

  constructor() {
    this.createSample = this.createSample.bind(this);
    this.saveMessage = this.saveMessage.bind(this);
  }

  public async createSample(req: Request, res: Response): Promise<any> {
    const { to, from, body } = req.body;

    if (!to || !from || !body) {
      return res.status(400).json({ error: 'To, From, and body are required' });
    }

    const params:messageParams = {
      "to": to,
      "from": from,
      "body": body
    }

    try {
      console.log('params: ', params)
      const result = await this.saveMessage(params);
      res.status(201).json(result);
    } catch (error) {
      console.log('retryParams: ', params)
      let retry = await this.saveMessage(params)

      if(!retry)
        throw error;
    }
  }

  async saveMessage(params: messageParams){
    console.log('params: ', params)
    let retryCount = 0;
    const maxRetries = 3;

    try {
      const sample = new message(params);
      await sample.save();
    }catch (e){
      if(retryCount < maxRetries) {
        retryCount++;
        console.log("Retry " + retryCount)
        await this.saveMessage(params)
      }
    }
    return false;
  }
}

export default new SampleController();
