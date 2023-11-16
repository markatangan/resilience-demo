import { Request, Response } from 'express';
import message from '../models/resilienceModel';

export interface messageParams {
  to: string;
  from: string;
  body: string;
  retryCount: number;
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

    let retryCount = 0;

    const params:messageParams = {
      "to": to,
      "from": from,
      "body": body,
      "retryCount": retryCount
    }

    try {
      const result = await this.saveMessage(params);
      res.status(201).json(result);
    } catch (error) {
      let retry = await this.saveMessage(params)

      if(!retry)
        res.status(500).json({ error: 'Internal server error' });
    }
  }

  async saveMessage(params: messageParams){
    const maxRetries = 3;

    try {
      const sample = new message(params);
      await sample.save();
      return true;
    }catch (e){
      if(params.retryCount < maxRetries) {
        params.retryCount++;
        console.log('Retrying to save in database, Retry' + params.retryCount)
        await this.saveMessage(params)
        return true
      }else {
        console.log('Saving in databse failed for exceeding retry limit')
        return false
      }
    }
    return false;
  }
}

export default new SampleController();
