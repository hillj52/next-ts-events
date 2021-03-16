import axios from 'axios';
import React, { useRef } from 'react';
import classes from './newsletter-registration.module.css';

const NewsletterRegistration: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>();

  const registrationHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await axios.post('/api/newsletter', { email: emailInputRef.current.value });
    console.log(response);
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

export default NewsletterRegistration;