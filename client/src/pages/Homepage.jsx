import React from "react";
import { Link } from "react-router-dom";
import { HomepageMsg } from "../lang/homepage";

const styles = {
  homeContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#121212", // Dark background color
  },
  content: {
    textAlign: "center",
    maxWidth: "1024px",
    padding: "2rem",
    backgroundColor: "#1e1e1e", // Dark content background color
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "white", // Heading text color
  },
  description: {
    fontSize: "1.2rem",
    color: "#777",
    marginBottom: "2rem",
  },
  uploadButton: {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "1.2rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  },
};

const HomePage = () => {
  return (
    <div style={styles.homeContainer}>
      <div style={styles.content}>
        <h1 style={styles.heading}>{HomepageMsg.msgHomepage}</h1>
        <p style={styles.description}>{HomepageMsg.msgDescription}</p>
        <Link to="/upload" style={styles.uploadButton}>
          {HomepageMsg.msgUploadNow}
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
