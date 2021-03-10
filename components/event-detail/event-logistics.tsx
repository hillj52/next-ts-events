import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import dateFormatter from '../../utils/date-formatter';
import addressFormatter from '../../utils/address-formatter';
import Image from 'next/image';

import classes from './event-logistics.module.css';

interface EventLogisticsProps {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
}

const EventLogistics: React.FC<EventLogisticsProps> = ({ date, address, image, imageAlt }) => (
  <section className={classes.logistics}>
    <div className={classes.image}>
      <Image src={`/${image}`} alt={imageAlt} width={300} height={300} />
    </div>
    <ul className={classes.list}>
      <LogisticsItem icon={DateIcon}>
        <time>{dateFormatter(date)}</time>
      </LogisticsItem>
      <LogisticsItem icon={AddressIcon}>
        <address>{addressFormatter(address)}</address>
      </LogisticsItem>
    </ul>
  </section>
);


export default EventLogistics;
