import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});
export default function retrieveHelloWorldBean() {
  return axios.get("http://localhost:8080/hello-world-bean/Felipe");
}

export const retrieveFromApiPathVariable = (username) =>
  apiClient.get(`/hello-world-bean/${username}`);
