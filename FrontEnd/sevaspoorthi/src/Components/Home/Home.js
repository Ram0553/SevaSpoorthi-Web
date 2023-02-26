import Auth from '../Authentication/Auth';
import CardDeck from '../CardDeck/CardDeck';
import Footer from '../Footer/Footer';
import HomePageGallery from '../HomepageGallery/HomePageGallery';
import HomepageCarousel from '../HomepageCarousel/HomepageCarousel';
import NavBar from '../NavBar/NavBar';
import ScrollNotification from '../ScrollNotification/ScrollNotification';
import Welcome from '../Welcome/Welcome';
import { AuthProvider } from '../../Context/AuthContext';
import News from '../News/News';

function Home() {
  return (
    
    <AuthProvider>
      <div>
        <Auth/>
        <NavBar/>
        <ScrollNotification/>
        <HomepageCarousel/>
        <Welcome/>
        <News/>
        <HomePageGallery/>
        <CardDeck/>
        <Footer/>
      </div>
    </AuthProvider>
  );
}

export default Home;
