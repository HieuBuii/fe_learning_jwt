import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { signOut } from "../../auth/authActions";

const MainLayout = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("ACCESS_TOKEN");
    dispatch(signOut());
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link className="navbar-brand" to="/">
            <strong>JWT</strong>
          </Link>
          <Nav className="me-auto">
            <Link className="nav-link" to="/users">
              Home
            </Link>
            <Link className="nav-link" to="/users">
              Features
            </Link>
            <Link className="nav-link" to="/test">
              Pricing
            </Link>
          </Nav>
          <Button onClick={handleLogout} variant="primary">
            Logout
          </Button>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default MainLayout;
