import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import EduBot from './pages/EduBot';
import Eduler from './pages/Eduler';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Tasks from './pages/Tasks';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
  <BrowserRouter>
  {/* header */}
  <Header />
  <Routes>
    <Route path='/' element={<Dashboard/>} />
    <Route path='tasks' element={<Tasks/>} />
    <Route path='about' element={<About/>} />
    <Route path='edubot' element={<EduBot/>} />
    <Route path='eduler' element={<Eduler/>} />
    <Route element={<PrivateRoute/>}>
    <Route path='profile' element={<Profile/>} />
    </Route>
    <Route path='sign-in' element={<SignIn/>} />
    <Route path='sign-up' element={<SignUp/>} />
  </Routes>
    </BrowserRouter>
  );
}
