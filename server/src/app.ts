import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { errorHandler } from './middlewares/error-handler';

import { addEmailRouter } from './routes/emails/add';
import { showEventsRouter } from './routes/events/show';
import { addCommentRouter } from './routes/comments/add';
import { showCommentsRouter } from './routes/comments/show';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
  })
);

// use routers here
app.use(addEmailRouter);
app.use(showEventsRouter);
app.use(addCommentRouter);
app.use(showCommentsRouter);

app.use(errorHandler);

export { app };
