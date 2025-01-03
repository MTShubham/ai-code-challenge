import { SessionProvider } from 'next-auth/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { ToasterProvider } from '../components/Toaster';
import Header from '../components/Header';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {/* <ToasterProvider> */}
        <Header />
        <Component {...pageProps} />
      {/* </ToasterProvider> */}
    </SessionProvider>
  );
}

export default MyApp;