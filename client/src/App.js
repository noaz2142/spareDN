/* eslint-disable */
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home, Login, PartsView, Navbar, CategoryView, SignUp, 
  FindPart, AddPartForm
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
          <Route path="/find-part" element={<FindPart />} />
          <Route path="/add-part" element={<AddPartForm />} />
          <Route path="parts/:id" element={<PartsView />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}
export default App;





