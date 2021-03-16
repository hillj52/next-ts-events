import axios from 'axios';

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  image: string;
  isFeatured: boolean;
}

export const getAllEvents = async () => {
  const { data } = await axios.get<Event[]>(
    `${process.env.API_URL_BASE}/api/events`
  );
  return data;
};

export const getFeaturedEvents = async () =>
  (await getAllEvents()).filter((event) => event.isFeatured);

export const getEventById = async (id: string) =>
  (await getAllEvents()).find((event) => event.id === id);

export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}) => {
  const { year, month } = dateFilter;

  let filteredEvents = (await getAllEvents()).filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
