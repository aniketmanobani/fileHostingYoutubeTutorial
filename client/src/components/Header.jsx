import React from "react";
import { Config } from "../config";

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
        <div style={headerStyles.logo}>{Config.APP_NAME}</div>
        <nav style={headerStyles.navLink}>
          <a style={headerStyles.navLink} href="#">
            Link 1
          </a>
          <a style={headerStyles.navLink} href="#">
            Link 2
          </a>
          <a style={headerStyles.navLink} href="#">
            Link 3
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
