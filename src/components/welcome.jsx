import { Link } from "react-router-dom";
import { useAuth } from "../security/authProvider";
import { useState } from "react";
import { retrieveFromApiPathVariable } from "./api/helloWorldApiService";

export default function Welcome() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const [message, setMessage] = useState(null);

  function callHelloWorldRestApi() {
    //retrieveHelloWorldBean()
    retrieveFromApiPathVariable("Felipe")
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("CleanUp."));
  }

  function successfulResponse(response) {
    console.log(response);
    setMessage(response.data.message);
  }
  function errorResponse(error) {
    console.log(error);
  }

  return (
    <div className="WelcomePage">
      <h4>Todo App Management</h4>
      {isAuthenticated ? (
        <div className="WelcomeComponent">
          Go to your Todos - <Link to="/todos">Todos</Link>
        </div>
      ) : (
        <div className="WelcomeComponent">Login to manage your Todos.</div>
      )}
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
          Call Hello World REST API.
        </button>
        <div className="text-info">{message}</div>
      </div>
    </div>
  );
}
