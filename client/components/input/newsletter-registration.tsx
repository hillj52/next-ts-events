import axios from 'axios';
import React, { useRef } from 'react';
import withAppContext, { NotificationContextProps } from '../hoc/with-notification-consumer';
import classes from './newsletter-registration.module.css';


const NewsletterRegistration: React.FC<NotificationContextProps> = ({ appContext }) => {
  const emailInputRef = useRef<HTMLInputElement>();
  const { showNotification } = appContext;

  const registrationHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    showNotification({
      title: 'Signing up',
      message: 'Registering for newsletter',
      status: 'pending',
    });
    try {
      await axios.post('/api/newsletter', { email: emailInputRef.current.value });
      showNotification({
        title: 'Success',
        message: 'Successfully registered for newsletter',
        status: 'success',
      });
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.message || 'Something went wrong',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default withAppContext(NewsletterRegistration);