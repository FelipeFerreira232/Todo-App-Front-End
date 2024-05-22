import { createContext, useContext, useState } from "react";

export const authContext = createContext();
export const useAuth = () => useContext(authContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  function loginAuth(username, password) {
    if (username === "Felipe" && password === "123") {
      setAuthenticated(true);
      setUsername(username);
      console.log("Correct username");
      return true;
    } else {
      setAuthenticated(false);
      setUsername(null);
      console.log("Incorrect username");
      return false;
    }
  }

  function logoutAuth() {
    setAuthenticated(false);
  }

  return (
    <authContext.Provider
      value={{ username, isAuthenticated, loginAuth, logoutAuth }}
    >
      {children}
    </authContext.Provider>
  );
}
