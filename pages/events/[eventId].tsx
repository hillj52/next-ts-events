import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import { getEventById, getFeaturedEvents } from '../../utils/api-util';

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

const EventDetailPage: NextPage<EventDetailPageProps> = ({ title, description, date, image, location }) => (
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

export const getStaticProps: GetStaticProps<EventDetailPageProps, EventDetailQueryParams> = async (context) => {
  const event = await getEventById(context.params.eventId);
  if (!event) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...event
    },
    revalidate: 30,
  }
}

export const getStaticPaths: GetStaticPaths<EventDetailQueryParams> = async () => {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map(event => ({ params: { eventId: event.id } }));
  
  return {
    paths,
    fallback: 'blocking',
  }
}

export default EventDetailPage;