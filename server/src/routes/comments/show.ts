import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { BadRequestError } from '../../errors/bad-request-error';
import { Event } from '../../models/event';

const router = express.Router();

router.get('/api/comments/:eventId', async (req: Request, res: Response) => {
  const eventId = req.params.eventId;
  if (!eventId || !mongoose.Types.ObjectId.isValid(eventId)) {
    throw new BadRequestError('Invalid event ID');
  }

  const event = await Event.findById(eventId).populate('comments').exec();
  if (!event) {
    throw new BadRequestError('No event found');
  }
  const { comments } = event;

  res.status(200).send(comments);
});

export { router as showCommentsRouter };
