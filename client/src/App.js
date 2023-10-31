/* eslint-disable */
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home, Login, PartsView, NavBar, CategoryView, SignUp
} from './Components';
// import { Provider } from 'react-redux/es';
// import Store from './Redux/MainReducer';

function App() {
  // useEffect(() => {
  //   Store.dispatch({
  //     type: 'CREATE_USER',
  //     payload: { id: '123' }
  //   });
  // }, [])

  return (
    <>
      {/* <Provider /* store={Store} */}
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<CategoryView />} />
          <Route path="parts/:id" element={<PartsView />} />
          <Route path="signup" element={<SignUp />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter >
      {/* </Provider> */}
    </>
  )
}
export default App;





