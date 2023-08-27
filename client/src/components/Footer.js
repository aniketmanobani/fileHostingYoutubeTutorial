import React from "react";
import { Config } from "../config";

const styles = {
  footer: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
  },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      &copy; {currentYear} {Config.APP_NAME}. All rights reserved.
    </footer>
  );
};

export default Footer;
