import { GetServerSideProps } from 'next';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import { ParsedUrlQuery } from 'node:querystring';

interface FilteredEventsPageProps {
  year: string;
  month: string;
}

interface FilteredEventsQueryParams extends ParsedUrlQuery {
  slug: [string, string];
}

export const getServerSideProps: GetServerSideProps<FilteredEventsPageProps, FilteredEventsQueryParams> = async (context) => {
  const [year, month] = context.params.slug;
  return {
    props: {
      year,
      month,
    }
  }
}

const FilteredEventsPage: React.FC<FilteredEventsPageProps> = ({ year, month }) => {
  
  const numYear = +year;
  const numMonth = +month;

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return <p>Invalid filter</p>
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No Events found for the chosen filter</p>
  }

  return (
    <EventList events={filteredEvents} />
  );
}

export default FilteredEventsPage;