import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'invalid email' });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.API_URL_BASE}/api/emails`,
        {
          email,
          sendNewsletter: 'true',
        }
      );
      res.status(response.status).send(response.data);
      return;
    } catch (err) {
      res.status(500).json({ message: 'General server error' });
    }
  } else {
    res.status(500).json({ message: 'invalid request' });
    return;
  }
};

export default handler;
