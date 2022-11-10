import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Offer from './pages/Offer';
// import Message from './pages/Message';
import Check from './pages/Check';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/offer' element={<Offer/>} />
          {/* <Route path='/message' element={<Message/>} /> */}
          <Route path='/check' element={<Check/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
