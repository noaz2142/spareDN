import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home, Login, PartsView, Navbar, CategoryView, SignUp,
  FindPart, AddPartForm, MyProducts
} from './Components';
import axios from 'axios';

function App() {
  const [categoryList, setCategorys] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [parts, setParts] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    if (!categoryList?.length) {
      // שליפת הרשימה של הקטגוריות- office' kitchen
      axios.get('https://localhost:7082/api/Parts/getCategoryList', {})
        .then(response => setCategorys(response.data || []))
        .catch((ex) => console.error(ex));
    }
  };

  // כל העמודים בפרויקט
  return (
    <>
      <BrowserRouter>
        <Navbar currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/my-products" element={<MyProducts currentUser={currentUser} setParts={setParts} />} />
          <Route path="/category" element={<CategoryView categoryList={categoryList} currentUser={currentUser} />} />
          <Route path="/find-part" element={<FindPart currentUser={currentUser} parts={parts} setParts={setParts} />} />
          <Route path="/add-part" element={<AddPartForm categoryList={categoryList} currentUser={currentUser} />} />
          <Route path="/add-part/:itemId" element={<AddPartForm parts={parts} categoryList={categoryList} currentUser={currentUser} />} />
          <Route path="parts/:id" element={<PartsView currentUser={currentUser} parts={parts} setParts={setParts} />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}
export default App;





