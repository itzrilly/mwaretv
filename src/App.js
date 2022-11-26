import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Offer from './pages/Offer';
import Check from './pages/Check';
import Message from './pages/Message';
import { useState } from 'react';

function App() {
  
  const [ user, setUser ] = useState(localStorage.getItem('subscriber_number'));

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('subscriber_number');
    window.location = '/';
  }

  return (
    <Router>
      <div className="App">
        { user ? (
        <Routes>
          <Route path='/check' element={<Check/>} />
          <Route path='/offer' element={<Offer signOut={signOut} />} />
          <Route path='/msg' element={<Message signOut={signOut} />} />
        </Routes>
        ) : 
        <Routes>
          <Route path='/' element={<Login setUser={setUser} />} />
        </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
