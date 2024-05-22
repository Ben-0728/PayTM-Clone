import React from 'react'
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom'
import Signup from './pages/SignUp'
import Signin from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'

function App() {

  return (
    <div>
    <Router>
    <Routes>  
    <Route path="/signup" element={<Signup />}></Route>
    <Route path="/signin" element={<Signin />}></Route>
    <Route path="/dashboard" element={<Dashboard />}></Route>
    <Route path="/send" element={<SendMoney />}></Route>
    </Routes>
    </Router>
    </div>
  )
}

export default App
