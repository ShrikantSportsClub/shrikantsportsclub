import { Link } from "react-router-dom";

function HamburgerMenu() {
  return (
    <nav className="site-menu">
      <Link to="/">HOME</Link>
      <Link to="/about">ABOUT</Link>
      <Link to="/ganesh-utsav-2026">GANESH UTSAV</Link>
      <Link to="/gallery">GALLERY</Link>
      <Link to="/members">MEMBERS</Link>
      <Link to="/contact">CONTACT</Link>
    </nav>
  );
}

export default HamburgerMenu;