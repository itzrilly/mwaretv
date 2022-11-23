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

  return (
    <Router>
      <div className="App">
        { user ? (
        <Routes>
          <Route path='/check' element={<Check/>} />
          <Route path='/offer' element={<Offer/>} />
          <Route path='/msg' element={<Message/>} />
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
