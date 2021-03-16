import { NextApiRequest, NextApiResponse } from 'next';
import {
  getComments,
  addComment,
  Comment,
} from '../../../utils/api-utils/comments';

interface PostReqBody {
  name: string;
  email: string;
  text: string;
}

type NextApiRequestWithEventId = NextApiRequest & {
  query: {
    eventId: string;
  };
};

export interface PostResponseType {
  message: string;
  comment?: Comment;
}

export interface GetResponseType {
  comments: Comment[];
}

type ResponseType = PostResponseType | GetResponseType;

const handler = async (
  req: NextApiRequestWithEventId,
  res: NextApiResponse<ResponseType>
) => {
  const { eventId } = req.query;

  switch (req.method) {
    case 'POST': {
      const { email, name, text } = req.body as PostReqBody;
      if (
        !email ||
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === ''
      ) {
        res.status(422).json({ message: 'Invalid input' });
        return;
      }

      const comment = await addComment({ name, text, email }, eventId);

      res.status(201).json({ message: 'Comment Added', comment });
      return;
    }
    case 'GET': {
      const comments = await getComments(eventId);

      res.status(200).json({ comments });
      return;
    }
    default: {
      res.status(500).json({ message: 'Bad Request' });
      return;
    }
  }
};

export default handler;
