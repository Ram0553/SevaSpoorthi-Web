import './App.css';
import { AuthProvider } from './Context/AuthContext';
import Gallery from './Components/Gallery/Gallery';
import Home from './Components/Home/Home';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import AdminPortal from './Components/AdminPortal/AdminPortal';
import AboutUs from './Components/AboutUs/AboutUs';
import DonateDetails from './Components/DonateDetails/DonateDetails';
import DonatePage from './Components/DonatePage/DonatePage';

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
          <Route path="/Donate" exact element={<DonatePage/>}/>
          <Route path="/Donate/:id" exact element={<DonateDetails/>}/>
        </Routes>
        </AuthProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
