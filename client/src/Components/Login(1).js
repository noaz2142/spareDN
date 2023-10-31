import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  return (
    <form
      className="needs-validation"
      noValidate
    >
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' required />
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
          <a href="!#">Forgot password?</a>
        </div>

        <MDBBtn className="mb-4">Sign in</MDBBtn>

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
    </form>
  );
}
