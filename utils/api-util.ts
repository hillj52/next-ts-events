import axios from 'axios';

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

interface FBEvent {
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export const getAllEvents = async () => {
  const { data } = await axios.get<FBEvent>(
    'https://nextjs-events-app-default-rtdb.firebaseio.com/events.json'
  );

  const events: Event[] = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
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
