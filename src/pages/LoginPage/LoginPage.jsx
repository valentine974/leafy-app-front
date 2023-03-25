import "./LoginPage.css";
import { useState, useContext } from "react";
import {useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
// import axios from "axios";

// const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5006";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser, user } = useContext(AuthContext); 

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 

    authService
    .login(requestBody)
    .then((response) => { 
      
      storeToken(response.data.authToken);
      authenticateUser(); 
      console.log(user.isNewEmployee)
      if(user) {
        console.log('is new')

      navigate("/user/modify-password");

      } else {
        console.log('is not new')

      navigate("/user");
      }


    })
    .catch((error) => { 
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    });

    
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
 
    </div>
  );
}

export default LoginPage;
