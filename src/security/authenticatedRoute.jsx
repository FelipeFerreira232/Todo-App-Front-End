import Login from "../components/login";
import { useAuth } from "./authProvider";

export default function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) return children;
  else
    return (
      <div className="ErrorMessage">
        You need to be logged in to manage your Todos.
        <Login></Login>
      </div>
    );
}
