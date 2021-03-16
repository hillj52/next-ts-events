import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Event } from '../../models/event';

const router = express.Router();

router.get('/api/events', async (req: Request, res: Response) => {
  const events = await Event.find({});
  res.status(200).send(events);
});

export { router as showEventsRouter };
