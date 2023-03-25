import { useState , useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";
function UserSettingPage() {
//const {email, name, surname, contractStartDate, position, companyId, validators} = req.body
  const {user} = useContext(AuthContext); 
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(()=>{  
    authService.getUser(user._id)
    .then(foundUser =>{
      const {email, name, surname} = foundUser.data
      setEmail(email)
      setName(name)
      setSurname(surname)
    })}, [])

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleSurname = (e) => setSurname(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (email === "" || name === "" || surname === ""  ) {
      setErrorMessage("Email, name and surname can not be empty" ) 
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrorMessage( "Provide a valid email address." );
      return;
    }
    authService.updateUserinfo(user._id, {email,name, surname})
    .then(()=>navigate("/user"))
    .catch(err=>console.log("error in updating user info", err))
  };




  return (
    <div className="ModifyPasswordPage">
      <h1>Set a new password for {user.email}</h1>

      <form onSubmit={handleSignupSubmit}>

        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleName}
        />

      <label>Surname: </label>
        <input
          type="text"
          name="surname"
          value={surname}
          onChange={handleSurname}
        />

        <button type="submit">Modify</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

    </div>
  );
}
export default UserSettingPage;