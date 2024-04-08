import React, { useState } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [newUser, setNewUser] = useState({
    userName: '',
    phone: '',
    mail: '',
    userPassword: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPhoneValid, setPhoneValid] = useState(true);
  const navigate = useNavigate();

  const onChangeHandler = (field, value) => {
    setShowFailure(false);
    setShowSuccess(false);
    setNewUser((user) => ({ ...user, [field]: value }));

    // Validate the input fields
    switch (field) {
      case 'mail':
        setEmailValid(/^\S+@\S+\.\S+$/.test(value)); // Basic email format validation
        break;
      case 'userPassword':
        setPasswordValid(value.length >= 8); // Password must be at least 8 characters long
        break;
      case 'phone':
        setPhoneValid(/^\d{10}$/.test(value)); // Basic phone number format validation (10 digits)
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      // הרשמה- קריאה לאי פי אי כדי לרשום את המשתמש החדש
      axios.post('https://localhost:7082/api/User/sign-up', newUser)
        .then(response => {
          if (response.status === 200 && response.data) {
            setShowSuccess(true);
            localStorage.setItem('user', JSON.stringify(response.data || ''));
            window.location.reload();
          }
        })
        .catch((ex) => {
          console.log(ex);
          setShowFailure(true);
        });
    }
  };

  const isFormValid = () => {
    return isEmailValid && isPasswordValid && isPhoneValid &&
      newUser.userName && newUser.phone && newUser.mail && newUser.userPassword;
  };

  return (
    <>
      {showSuccess && (
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Welcome!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>You have been signed in successfully</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={() => { setShowSuccess(false); navigate('/home'); }}>Home</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}

      {showFailure && (
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Incorrect Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>We were Not Able to Complete the Request Now. Enter another name</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowFailure(false)}>Try Again</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
      {!showSuccess && !showFailure && (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

          <MDBInput wrapperClass='mb-4' label='User Name' id='form1' type='text' required onChange={(ev) => onChangeHandler('userName', ev.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Phone' id='form1' type='tel' required onChange={(ev) => onChangeHandler('phone', ev.target.value)} isValid={isPhoneValid} />
          {!isPhoneValid && <small className="text-danger">Please enter a valid phone number (10 digits).</small>}
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' required onChange={(ev) => onChangeHandler('mail', ev.target.value)} isValid={isEmailValid} />
          {!isEmailValid && <small className="text-danger">Please enter a valid email address.</small>}
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' onChange={(ev) => onChangeHandler('userPassword', ev.target.value)} isValid={isPasswordValid} />
          {!isPasswordValid && <small className="text-danger">Password must be at least 8 characters long.</small>}
          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I want to join the newsletter' />
          </div>

          <MDBBtn className="mb-4 w-100 btn btn-primary" onClick={handleSubmit} disabled={!isFormValid()}>Sign up</MDBBtn>
          <div className="text-center">
            <p>Already a member? <a className='register-link' href='' onClick={() => navigate('/login')}>Sign in</a></p>
          </div>
        </MDBContainer>
      )}
    </>
  );
}
