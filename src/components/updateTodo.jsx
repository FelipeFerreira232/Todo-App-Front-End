import { useNavigate, useParams } from "react-router-dom";
import {
  retrieveTodoApi,
  updateTodoApi,
  createTodoApi,
} from "./api/todoApiService";
import { useAuth } from "../security/authProvider";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

export default function UpdateTodo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => retrieveTodos(), [id]);

  function onSubmit(values) {
    const todo = {
      id: id,
      username: username,
      targetDate: values.targetDate,
      description: values.description,
      done: false,
    };
    console.log(todo);
    if (id == -1) {
      createTodoApi(username, todo);
      navigate("/todos");
    } else
      updateTodoApi(username, id, todo)
        .then((response) => navigate("/todos"))
        .catch((error) => console.log(error));
  }

  function validate(values) {
    const errors = {
      //description: "Enter a valid description",
      //targetDate: "Enter a valid target date",
    };
    if (values.description.length < 5) {
      errors.description = "Enter five characters.";
    }
    if (
      values.targetDate == null ||
      values.targetDate == "" ||
      !moment(values.targetDate).isValid()
    ) {
      errors.description = "Enter a valid target date.";
    }
    return errors;
  }

  function retrieveTodos() {
    if (id != -1) {
      retrieveTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="container">
      <h3>Todo - Details</h3>
      <div className="todo-details">
        <Formik
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={true}
          enableReinitialize={true}
          initialValues={{ description, targetDate }}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              ></ErrorMessage>
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              ></ErrorMessage>
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                ></Field>
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field
                  type="date"
                  className="form-control"
                  name="targetDate"
                ></Field>
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
