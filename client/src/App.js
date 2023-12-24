/* eslint-disable */
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home, Login, PartsView, Navbar, CategoryView, SignUp
} from './Components';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<CategoryView />} />
          <Route path="parts/:id" element={<PartsView />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}
export default App;





