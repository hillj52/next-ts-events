import Head from 'next/head';
import { getFeaturedEvents, Event } from '../utils/api-utils/events';
import EventList from '../components/events/event-list';
import { GetStaticProps, NextPage } from 'next';
import NewsletterRegistration from '../components/input/newsletter-registration';

interface HomePageProps {
  featuredEvents: Event[];
}

const HomePage: NextPage<HomePageProps> = ({ featuredEvents }) => {
  return (
    <main>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find great events" />
      </Head>
      <NewsletterRegistration />
      <EventList events={featuredEvents} />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  }
}

export default HomePage;