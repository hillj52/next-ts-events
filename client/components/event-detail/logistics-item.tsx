import classes from './logistics-item.module.css';

interface LogisticsItemProps {
  icon: React.ReactNode;
}

const LogisticsItem: React.FC<LogisticsItemProps> = ({ icon, children }) => (
    <li className={classes.item}>
      <span className={classes.icon}>
        {icon}
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );

export default LogisticsItem;
