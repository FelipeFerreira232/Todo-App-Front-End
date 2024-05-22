import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/authProvider";

export default function Login() {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const authContext = useAuth();
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleSubmit() {
    if (authContext.loginAuth(username, password)) {
      setShowErrorMessage(false);
      navigate(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true);
    }
  }
  return (
    <div className="Login">
      {showErrorMessage ? (
        <div className="ErrorMessage">Authentication Failed. Try again.</div>
      ) : null}
      <h4>Time to Login</h4>
      <div className="LoginForm">
        <div className="Username">
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          ></input>
        </div>
        <div className="Password">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>
        <div>
          <button
            type="button"
            name="login"
            className="LoginButton"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
