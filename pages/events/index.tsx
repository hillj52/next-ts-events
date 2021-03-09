import { getAllEvents } from '../../dummy-data';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

const AllEventsPage: React.FC = () => {
  const router = useRouter();
  const events = getAllEvents()
  const findEventsHandler = (year: string, month: string) => {
    router.push(`/events/${year}/${month}`);
  }
  
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </>
  );
}

export default AllEventsPage;