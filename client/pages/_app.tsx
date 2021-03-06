import '../styles/globals.css'
import Head from 'next/head';
import { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import NotificationContextProvider from '../store/notification-context';

const  MyApp = ({ Component, pageProps }: AppProps) => (
  <NotificationContextProvider>
    <Layout>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="NextJS Events"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  </NotificationContextProvider>
);

export default MyApp
