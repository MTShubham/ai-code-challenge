import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { ToasterProvider } from '../components/Toaster';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;