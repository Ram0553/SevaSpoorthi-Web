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
import DonateHomePage from '../DonateHomePage/DonateHomePage';
import TextEditor from '../TextEditor/TextEditor';
import { useState } from 'react';
import { EditorState } from 'draft-js';
import { useRef } from 'react';

function Home() {
  const [editorState,setEditorState] = useState(EditorState.createEmpty());
  const newsRef = useRef();
  const programsRef = useRef();
  const galleryRef = useRef();
  function onClickRef(scrollRef){
    console.log(scrollRef);
    switch(scrollRef){
      case "news":
        window.scrollTo({ behavior: 'smooth', top: newsRef.current.offsetTop })
        break;
      case "programs":
        window.scrollTo({ behavior: 'smooth', top: programsRef.current.offsetTop })
        break;
      case "gallery":
        window.scrollTo({ behavior: 'smooth', top: galleryRef.current.offsetTop })
        break;
    }
  }
  
  return (
    
    <AuthProvider>
      <div>
        <Auth/>
        <NavBar/>
        <ScrollNotification/>
        <HomepageCarousel/>
        <TextEditor editorState={editorState} setEditorState={setEditorState} />
        <Welcome/>
        <News mref={newsRef}/>
        <HomePageGallery mref={galleryRef}/>
        <DonateHomePage/>
        <CardDeck mref={programsRef}/>
        <Footer func={onClickRef}/>
      </div>
    </AuthProvider>
  );
}

export default Home;
