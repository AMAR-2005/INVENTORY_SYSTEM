import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ContextAPI from './ContextAPI';
import Login from './login/Login';
import Signup from './signup/signup';
import DashboardPage from './dashboard/DashboardPage';
import InventoryPage from './inventorypage/InventoryPage';
import PurchasePage from './purchase/PurchasePage';
import ReportPage from './Report/ReportPage';
import SalesPage from './sales/SalesPage';
function App() {
  return (
    <ContextAPI>
      <Router>
          <Routes>
              <Route path='/' element={<Login/>} />
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/dashboard' element={<DashboardPage/>} />
              <Route path='/inventory' element={<InventoryPage/>} />
              <Route path='/sales' element={<SalesPage/>} />
              <Route path='/purchase' element={<PurchasePage/>} />
              <Route path='/report' element={<ReportPage/>} />
          </Routes>
      </Router>
    </ContextAPI>
  )
}
export default App