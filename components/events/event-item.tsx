import { Event } from '../../utils/api-util';
import Image from 'next/image';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import DateIcon from '../icons/date-icon';
import Button from '../ui/button';
import dateFormatter from '../../utils/date-formatter';
import addressFormatter from '../../utils/address-formatter';

import classes from './event-item.module.css';

interface EventItemProps {
  event: Event
}

const EventItem: React.FC<Event> = ({ id, title, description, location, date, image, isFeatured }) => (
  <li className={classes.item}>
    <Image src={`/${image}`} alt={title} width={250} height={160} />
    <div className={classes.content}>
      <div className={classes.summary}>
        <h2>{title}</h2>
        <div className={classes.date}>
          <DateIcon />
          <time>
            {dateFormatter(date)}
          </time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>
            {addressFormatter(location)}
          </address>
        </div>
      </div>
      <div className={classes.actions}>
        <Button href={`/events/${id}`}>
          <span>Explore Event</span>
          <span className={classes.icon}><ArrowRightIcon /></span>
        </Button>
      </div>
    </div>
  </li>
);

export default EventItem;