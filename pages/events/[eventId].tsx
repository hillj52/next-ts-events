import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import { getEventById } from '../../dummy-data';

interface EventDetailPageProps {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  location: string;
}

interface EventDetailQueryParams extends ParsedUrlQuery {
  eventId: string;
}

export const getServerSideProps: GetServerSideProps<EventDetailPageProps, EventDetailQueryParams> = async (context) => {
  const event = getEventById(context.params.eventId);
  if (!event) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...event
    }
  }
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ title, description, date, image, location }) => (
  <>
    <EventSummary title={title} />
    <EventLogistics 
      date={date} 
      address={location} 
      image={image} 
      imageAlt={title}
    />
    <EventContent>
      <p>{description}</p>
    </EventContent>
  </>
);

export default EventDetailPage;