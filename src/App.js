import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './login/Login';
import Signup from './signup/signup';
import Home from './homepage/Home';
import ContextAPI from './ContextAPI';

function App() {
  return (
    <ContextAPI>
      <Router>
          <Routes>
              <Route path='/' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
              <Route path='/home' element={<Home/>} />
          </Routes>
      </Router>
    </ContextAPI>
  )
}
export default App