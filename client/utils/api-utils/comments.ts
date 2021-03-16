import axios from 'axios';

export interface Comment {
  id?: string;
  name: string;
  text: string;
  email: string;
}

export const getComments = async (eventId: string) => {
  const { data } = await axios.get<Comment[]>(
    `${process.env.API_URL_BASE}/api/comments/${eventId}`
  );
  return data;
};

export const addComment = async (
  { name, text, email }: Comment,
  eventId: string
) => {
  const { data } = await axios.post(
    `${process.env.API_URL_BASE}/api/comments/`,
    {
      name,
      text,
      eventId,
    }
  );
  return data;
};
