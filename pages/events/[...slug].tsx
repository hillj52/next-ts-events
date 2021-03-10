import { GetServerSideProps, NextPage } from 'next';
import { getFilteredEvents, Event } from '../../utils/api-util';
import EventList from '../../components/events/event-list';
import { ParsedUrlQuery } from 'node:querystring';

interface FilteredEventsPageProps {
  filteredEvents: Event[];
  error?: string;
}

const FilteredEventsPage: NextPage<FilteredEventsPageProps> = ({ filteredEvents, error }) => {

  if (error) {
    return (
      <p>{error}</p>
    )
  }

  return (
    <EventList events={filteredEvents} />
  );
}

interface FilteredEventsQueryParams extends ParsedUrlQuery {
  slug: [string, string];
}

export const getServerSideProps: GetServerSideProps<FilteredEventsPageProps, FilteredEventsQueryParams> = async (context) => {
  const [yearString, monthString] = context.params.slug;

  const year = +yearString;
  const month = +monthString;

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return { notFound: true };
  }

  const filteredEvents = await getFilteredEvents({ year, month });

  if (!filteredEvents || filteredEvents.length === 0) {
    return { 
      props: {
        filteredEvents: [], 
        error: 'No events found' 
      } 
    };
  }

  return {
    props: {
      filteredEvents
    }
  }
}

export default FilteredEventsPage;