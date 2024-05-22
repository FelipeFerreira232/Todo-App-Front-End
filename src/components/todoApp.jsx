import FooterComponent from "./footerComponent";
import Logout from "./logout";
import Login from "./login";
import Welcome from "./welcome";
import HeaderComponent from "./headerComponent";
import "./todoApp.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticatedRoute from "../security/authenticatedRoute";
import AuthProvider from "../security/authProvider";
import ListTodos from "./ListTodos";
import UpdateTodo from "./updateTodo";

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent></HeaderComponent>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>

            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }
            ></Route>

            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodos></ListTodos>
                </AuthenticatedRoute>
              }
            ></Route>

            <Route
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <UpdateTodo></UpdateTodo>
                </AuthenticatedRoute>
              }
            ></Route>

            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <Logout></Logout>
                </AuthenticatedRoute>
              }
            ></Route>
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
