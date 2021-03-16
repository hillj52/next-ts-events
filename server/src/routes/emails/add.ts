import express, { Response } from 'express';
import CustomRequest from '../../utils/custom-request';
import { body } from 'express-validator';
import { Email } from '../../models/email';
import { validateRequest } from '../../middlewares/validate-request';

interface AddEmailRequestBody {
  email: string;
  sendNewsletter: boolean;
}

const router = express.Router();

router.post(
  '/api/emails/',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('sendNewsletter')
      .isBoolean()
      .withMessage('Must indicate whether to receive the newsletter'),
  ],
  validateRequest,
  async (req: CustomRequest<AddEmailRequestBody>, res: Response) => {
    const { email, sendNewsletter } = req.body;

    const existingEmail = await Email.findOne({ email }).exec();
    if (existingEmail) {
      await existingEmail.updateOne({ sendNewsletter: true });
      res.status(204).send(existingEmail);
      return;
    }

    const emailAddress = Email.build({ email, sendNewsletter });
    await emailAddress.save();

    res.status(201).send(emailAddress);
  }
);

export { router as addEmailRouter };
