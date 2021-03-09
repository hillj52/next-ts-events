import classes from './event-summary.module.css';

interface EventSummaryProps {
  title: string;
}

const EventSummary: React.FC<EventSummaryProps> = ({ title }) => (
  <section className={classes.summary}>
    <h1>{title}</h1>
  </section>
);

export default EventSummary;