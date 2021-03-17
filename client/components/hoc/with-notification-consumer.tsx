import { NotificationContextConsumer, NotificationContextValues } from '../../store/notification-context';

export interface NotificationContextProps {
  appContext: NotificationContextValues;
}

const withAppContext = (Component: React.FC) => (props) => (
  <NotificationContextConsumer>
    {appContext => <Component {...props} appContext={appContext} />}
  </NotificationContextConsumer>
);

export default withAppContext;