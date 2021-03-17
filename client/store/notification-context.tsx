import { createContext, useState, useEffect } from 'react';

interface Notification {
  title: string;
  message: string;
  status: 'success' | 'error' | 'pending';
}

export interface NotificationContextValues {
  notification: Notification | null;
  showNotification: (notificationData: Notification) => void;
  hideNotification: () => void;
}

const { Provider, Consumer } = createContext<NotificationContextValues>({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

const NotificationContextProvider: React.FC = ({ children }) => {
  
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if(notification && (notification.status === 'success' || notification.status === 'error')) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [notification]);

  const showNotification = (notificationData: Notification) => {
    setNotification(notificationData);
  }

  const hideNotification = () => {
    setNotification(null);
  }

  const context = { notification, showNotification, hideNotification };

  return (
    <Provider value={context}>
      {children}
    </Provider>
  )
}

export { Consumer as NotificationContextConsumer }

export default NotificationContextProvider;
