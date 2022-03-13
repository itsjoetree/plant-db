import 'bootstrap/dist/css/bootstrap.min.css'
import SiteNavBar from '../components/SiteNavBar'
import '../index.css'

export default function App({ Component, pageProps }) {
    return (<>
      <SiteNavBar />
      <Component {...pageProps} />
    </>)
  }