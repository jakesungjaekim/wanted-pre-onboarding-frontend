import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Todo from './pages/Todo/Todo'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/todo" element={<Todo/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
