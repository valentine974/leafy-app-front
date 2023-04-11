import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";

function ModifyPasswordPage(props) {
  const { togglePage } = props;

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handlePassword1 = (e) => setPassword1(e.target.value);
  const handlePassword2 = (e) => setPassword2(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password1 === password2) {
      console.log("good to go");
      const password = password1;
      const requestBody = { password };
      authService
        .modifyPassword(user._id, requestBody)
        .then(() => navigate(`/user/${user._id}`))
        .catch((err) => console.log("error in modifying password", err));
    } else {
      setErrorMessage("The two passwords are not identical");
    }
  };

  return (
    <div className={`pageContainer ModifyPasswordPage ${togglePage}`}>
      <div className={`pageTitle ${togglePage}`}>
        <h1>NEW PASSWORD</h1>
      </div>
      <div className="pageContent">
        <h1>Set a new password for {user.email}</h1>
        <form onSubmit={handleSignupSubmit}>
          <label>Password:</label>
          <input
            type="password"
            name="password1"
            value={password1}
            onChange={handlePassword1}
          />
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={handlePassword2}
          />

          <button type="submit">Modify</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default ModifyPasswordPage;
