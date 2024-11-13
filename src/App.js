import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ContextAPI from './ContextAPI';
import Home from './homepage/Home';
import Login from './login/Login';
import Signup from './signup/signup';
function App() {
  return (
    <ContextAPI>
      <Router>
          <Routes>
              <Route path='/' element={<Login/>} />
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/home' element={<Home/>} />
          </Routes>
      </Router>
    </ContextAPI>
  )
}
export default App