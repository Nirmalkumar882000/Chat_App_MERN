import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Register from "./pages/Register"
import Login from "./pages/Login"
import SetAvatar from "./pages/SetAvatar"
import Chats from "./pages/Chats"




const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Chats/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/setAvatar' element={<SetAvatar/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
