import '../styles/globals.css'
import { AppProps } from 'next/app';
import Layout from '../components/layout/layout';

const  MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp
