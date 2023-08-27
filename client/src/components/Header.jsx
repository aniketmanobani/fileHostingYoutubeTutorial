import React from "react";
import { Config } from "../config";
import { Link } from "react-router-dom";
const headerStyles = {
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "#333",
    color: "white",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white !important",
    textDecoration: "none !important",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
  },
  mobile: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
};

const Header = () => {
  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.container}>
        <div style={headerStyles.logo}>
          <Link to="/" style={headerStyles.navLink}>
            {Config.APP_NAME}
          </Link>
        </div>
        <nav style={headerStyles.navLink}>
          <Link style={headerStyles.navLink} to="/">
            Home
          </Link>
          <Link style={headerStyles.navLink} to="/upload">
            Upload
          </Link>

          <Link style={headerStyles.navLink} to="/about">
            About Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
