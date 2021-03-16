import express, { Response } from 'express';
import CustomRequest from '../../utils/custom-request';
import { body } from 'express-validator';
import { Comment } from '../../models/comment';
import { Event } from '../../models/event';
import { Email } from '../../models/email';
import { validateRequest } from '../../middlewares/validate-request';
import mongoose from 'mongoose';
import { BadRequestError } from '../../errors/bad-request-error';

interface AddCommentRequestBody {
  text: string;
  emailId: string;
  eventId: string;
  name: string;
}

const router = express.Router();

router.post(
  '/api/comments/',
  [
    body('text').not().isEmpty().withMessage('Comment must be provided'),
    body('name').not().isEmpty().withMessage('Comment must be provided'),
    body('eventId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Valid event required'),
  ],
  validateRequest,
  async (req: CustomRequest<AddCommentRequestBody>, res: Response) => {
    const { eventId, text, name } = req.body;

    const event = await Event.findById(eventId).exec();
    if (!event) {
      throw new BadRequestError('Event not found');
    }

    const comment = Comment.build({
      text,
      name,
    });

    await comment.save();

    if (!event.comments) {
      event.comments = [];
    }

    event.comments.push(comment);
    await event.save();

    res.status(201).send(comment);
  }
);

export { router as addCommentRouter };
