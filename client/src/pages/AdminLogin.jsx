import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Config } from "../config";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#121212",
  },
  card: {
    padding: "2rem",
    borderRadius: "10px",
    backgroundColor: "#1e1e1e",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    color: "white",
    width: "300px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.5rem",
    width: "100%",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(Config.API_URL + "/dashboard", {
        username,
        password,
      });

      if (response.status === 200) {
        // Store credentials in localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        // Navigate to /adminpanel
        history("/adminpanel/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="button" onClick={handleLogin} style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
