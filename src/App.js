import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import NavBar from './components/NavBar';
import ForgotPassword from './components/auth/ForgotPassword'
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar /> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;