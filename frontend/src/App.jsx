import React from 'react'
import { BrowserRouter,Navigate,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import ChatApp from './pages/ChatApp'
import LoginLogout from './pages/LoginLogout'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import LocomotiveScroll from 'locomotive-scroll'

const Logout=()=>{
  localStorage.clear();
  return <Navigate to = '/login'/>
}

const RegisterLogout=()=>{
  localStorage.clear();
  return <Register/>
}

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();
  return (
    <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={ <Home/> }
      />
    <Route
        path='/app'
        element={ 
          <ProtectedRoute>
            <ChatApp  />
          </ProtectedRoute>
         }
      />
      <Route
        path='/login'
        element={ <LoginLogout/> }
      />
      <Route
        path='/register'
        element={ <RegisterLogout/> }
      />
      <Route
        path='/logout'
        element={ <Logout/> }
      />
    </Routes>
    </BrowserRouter>
  )
}

export default App