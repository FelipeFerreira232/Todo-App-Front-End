import { Link } from "react-router-dom";
import { useAuth } from "../security/authProvider";

export default function Header() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  return (
    <header className="header border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <a
              className="navbar-brand ms-2 fs-2 fw-bold text-black"
              href="https://www.nike.com.br"
            >
              Nike
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/welcome/Felipe" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/todos" className="nav-link">
                    Todos
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link
                    to="/logout"
                    className="nav-link"
                    onClick={() => authContext.logoutAuth()}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
