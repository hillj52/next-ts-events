import classes from './notification.module.css';
import withAppContext, { NotificationContextProps } from '../hoc/with-notification-consumer';

const Notification: React.FC<NotificationContextProps> =  ({ appContext: { notification: {title, message, status}, hideNotification }}) => {

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default withAppContext(Notification);