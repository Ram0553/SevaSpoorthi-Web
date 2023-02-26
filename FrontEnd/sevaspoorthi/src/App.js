import './App.css';
import { AuthProvider } from './Context/AuthContext';
import Gallery from './Components/Gallery/Gallery';
import Home from './Components/Home/Home';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import AdminPortal from './Components/AdminPortal/AdminPortal';
import AboutUs from './Components/AboutUs/AboutUs';
import NewsDetails from './Components/News/NewsDetails';

function App() {
  return (
    <BrowserRouter>
      <main>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/AboutUs" exact element={<AboutUs/>}/>
          <Route path="/AdminPortal" exact element={<AdminPortal/>} />
          <Route path="/Gallery/:path/:key" exact element={<Gallery/>} />
          <Route path="/NewsDetails" exact element={<NewsDetails/>}/>
        </Routes>
        </AuthProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
