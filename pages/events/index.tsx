import { getAllEvents, Event } from '../../utils/api-util';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { GetStaticProps, NextPage } from 'next';

interface AllEventsPageProps {
  events: Event[];
}

const AllEventsPage: NextPage<AllEventsPageProps> = ({ events }) => {
  const router = useRouter();
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

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  }
}

export default AllEventsPage;