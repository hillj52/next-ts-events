import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';

const FilteredEventsPage: React.FC = () => {
  const router = useRouter();
  
  const filterData = router.query.slug;

  if (!filterData) {
    return  <p>Loading...</p>
  }

  const year = filterData[0];
  const month = filterData[1];

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
    <>
      <EventList events={filteredEvents} />
    </>
  );
}
export default FilteredEventsPage;