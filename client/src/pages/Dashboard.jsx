import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa"; // Import the eye icon
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
    width: "80%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  actionButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  pagination: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  paginationButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "0 0.5rem",
  },
};

const ITEMS_PER_PAGE = 10; // Number of items per page

const Dashboard = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useNavigate();
  const [totalPages, setTotalPages] = useState(0);

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  useEffect(() => {
    if (!username || !password) {
      history("/adminpanel/login");
    } else {
      fetchData(currentPage);
    }
  }, [currentPage, history, username, password]);

  const fetchData = async (page) => {
    try {
      const response = await axios.post(
        `${Config.API_URL}/dashboard?page=${page}`,
        {
          username,
          password,
        }
      );
      setMediaFiles(response.data.mediaFiles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, display message, etc.
    }
  };

  const handleViewFile = (file) => {
    window.open(`/view/${file._id}`, "_blank");
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Dashboard</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Filename</th>
              <th style={styles.th}>Filesize</th>
              <th style={styles.th}>Visit Count</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mediaFiles.map((file) => (
              <tr key={file._id}>
                <td style={styles.td}>{file.filename}</td>
                <td style={styles.td}>{file.filesize}</td>
                <td style={styles.td}>{file.visitcount}</td>
                <td style={styles.td}>
                  <button
                    style={styles.actionButton}
                    onClick={() => handleViewFile(file)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.pagination}>
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              style={styles.paginationButton}
            >
              Previous
            </button>
          )}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              style={{
                ...styles.paginationButton,
                backgroundColor:
                  index + 1 === currentPage ? "#007bff" : "#343a40",
              }}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              style={styles.paginationButton}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
