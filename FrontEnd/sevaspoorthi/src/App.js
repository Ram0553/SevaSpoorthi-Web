import './App.css';
import { AuthProvider } from './Context/AuthContext';
import Gallery from './Components/Gallery/Gallery';
import Home from './Components/Home/Home';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import AdminPortal from './Components/AdminPortal/AdminPortal';

function App() {
  return (
    <BrowserRouter>
      <main>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/Gallery/:path/:key" exact element={<Gallery/>} />
          <Route path="/AdminPortal" exact element={<AdminPortal/>} />
        </Routes>
        </AuthProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
