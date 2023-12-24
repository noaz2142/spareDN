import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const navigate = useNavigate();
  const [existingUser, setExistingUser] = useState({
    userName: '',
    password: '',
  });
  const [loginErr, setLoginErr] = useState('');

  const submitLogin = async () => {
    try {
      const params = {
        ...existingUser
      }
      const response = await axios.post('https://localhost:7082/api/User/login', null, { params });
      if (response.data) {
        navigate('/home')
      } else {
        throw new Error('Incorrect User Name or Password');
      }
    } catch (ex) {
      console.log(ex.message);
      setLoginErr(ex.message);
    }
  };


  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {loginErr && <span className='login-inline-error'>{loginErr}</span>}
      <MDBInput
        wrapperClass='mb-4'
        label='User Name'
        id='form1'
        type='text'
        required
        value={existingUser.userName}
        onChange={(event) => setExistingUser({ ...existingUser, userName: event.target.value })}
      />
      <MDBInput
        wrapperClass='mb-4'
        label='Password'
        id='form2'
        type='password'
        value={existingUser.password}
        onChange={(event) => setExistingUser({ ...existingUser, password: event.target.value })}
      />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn
        disabled={!existingUser.password || !existingUser.userName}
        className="mb-4"
        onClick={submitLogin}
      >
        Sign in
      </MDBBtn>
      <div className="text-center">
        <p>Not a member? <a href='' onClick={() => navigate('/signup')}>Register</a></p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm" />
          </MDBBtn>

        </div>
      </div>
    </MDBContainer>
  );
}
