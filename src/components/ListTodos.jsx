import { useEffect, useState } from "react";
import {
  deleteTodoByUsernameAndId,
  retrieveAllTodosForUsername,
} from "./api/todoApiService";
import { useAuth } from "../security/authProvider";
import { useNavigate } from "react-router-dom";

export default function ListTodos() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  useEffect(() => refreshTodos(), []);

  function refreshTodos() {
    retrieveAllTodosForUsername(username)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => console.log(error));
  }

  function deleteTodo(id) {
    deleteTodoByUsernameAndId(username, id)
      .then((response) => {
        setMessage(`Deleted todo with id: ${id} -  Successful.`);
        refreshTodos();
      })
      .catch((error) => console.log(error));
  }

  function updateTodo(id) {
    console.log(`Update button clicked for id: ${id}.`);
    navigate(`/todo/${id}`);
  }

  function addTodo(username) {
    console.log("Add Todo button clicked.");
    navigate(`/todo/-1`);
  }

  return (
    <div className="container">
      <h1>List Todos Component</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Is Done?</th>
            <th>Target Date</th>
          </tr>
        </thead>
        <tbody>
          {/* description: "Get AWS Certified"
​​          done: false
​​
            id: 1
            ​​
            targetDate: "2034-04-23"
            ​​
            username: "Felipe" */}
          {todos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>{item.done.toString()}</td>
              <td>{item.targetDate.toString()}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => deleteTodo(item.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => updateTodo(item.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="">
        <button
          className="btn btn-success m-2"
          style={{ backgroundColor: "blue" }}
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
