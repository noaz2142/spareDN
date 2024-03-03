import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home, Login, PartsView, Navbar, CategoryView, SignUp,
  FindPart, AddPartForm
} from './Components';
import axios from 'axios';

function App() {
  const [categoryList, setCategorys] = useState(null);

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
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<CategoryView categoryList={categoryList} />} />
          <Route path="/find-part" element={<FindPart />} />
          <Route path="/add-part" element={<AddPartForm categoryList={categoryList} />} />
          <Route path="parts/:id" element={<PartsView />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}
export default App;





