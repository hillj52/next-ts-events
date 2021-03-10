import { Event } from '../../utils/api-util';
import EventItem from './event-item';

import classes from './event-list.module.css';

interface EventListProps {
  events: Event[]
}

const EventList: React.FC<EventListProps> = ({ events }) => (
  <ul className={classes.list}>
    {events.map(event => <EventItem key={event.id} {...event}/>)}
  </ul>
);

export default EventList;