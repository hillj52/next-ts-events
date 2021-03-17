import { useContext } from 'react';
import Header from './header';
import Notification from '../ui/notification';
import { NotificationContextConsumer } from '../../store/notification-context';

const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    <main>
      {children}
    </main>
    <NotificationContextConsumer>
      {notificationContext => notificationContext.notification && (
        <Notification 
          {...notificationContext.notification} 
          hideNotification={notificationContext.hideNotification}
        />
      )}
    </NotificationContextConsumer>
  </>
)

export default Layout;