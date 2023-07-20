import React, { useState } from "react";
// import {Button} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 30,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    width: 200,
    padding: '10px 30px',
    fontSize: "100%"
  },
  input: {
    background: 'white',
    border: '1px solid  #FE6B8B ',
    borderRadius: 30,
  }
});
export function SignInForm({ users, setChangePage }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleClick = () => {
    // users.forEach(user => {
    //   alert(user.email);
    //   if (user.email === email) {
    //     alert('work')
    //     setChangePage(true)
    //   }
    //   // navigate("/AllProducts")
    // });
    // fetch(`${apiUrl}user/login/${userName}/${password}`)
    // .then(res => res.json());
  }


  return (
    <div className="form-container sign-in-container">
      <form >
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          className={classes.input}
          type="email"
          placeholder="Email"
          name="email"

          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className={classes.input}

          type="password"
          name="password"
          placeholder="Password"

          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="#">Forgot your password?</a>
        <button className={classes.button} onClick={handleClick}>Sign In</button>
      </form>
    </div>
  );
}
