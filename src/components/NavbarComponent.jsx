import { useNavigate, Link } from "react-router-dom";

export default function NavbarComponent(props) {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <nav className="leftNavbarContainer">
        <div className="navItem" onClick={() => navigate("/")}>
          Home
        </div>
        <div className="navItem" onClick={() => navigate("discover")}>
          Discover
        </div>
        <div className="navItem" onClick={() => navigate("create_project")}>
          Start a project
        </div>
      </nav>
      <div className="centerNavbarContainer">FUNDEX</div>
      <div className="rightNavbarContainer">
        <div className="navItem">
          <Link to="/profile" state={{ address: props.address }}>
          
          </Link>
        </div>
      </div>
    </div>
  );
}
