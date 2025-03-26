import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import EduBot from './pages/EduBot';
import Eduler from './pages/Eduler';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Dashboard/>} />
    <Route path='about' element={<About/>} />
    <Route path='edubot' element={<EduBot/>} />
    <Route path='eduler' element={<Eduler/>} />
    <Route path='profile' element={<Profile/>} />
    <Route path='sign-in' element={<SignIn/>} />
    <Route path='sign-up' element={<SignUp/>} />
  </Routes>
    </BrowserRouter>

}
