import { useContext } from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/register';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/Authcontext';
import Messanger from './pages/messanger/messanger';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/register' replace />} />
        <Route path='/login' element={user ? <Navigate to='/' replace /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' replace /> : <Register />} />
        <Route path='/messanger' element={!user ? <Navigate to='/' replace /> : <Messanger />} />
        <Route path='/profile/:username' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
