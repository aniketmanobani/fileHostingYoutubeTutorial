import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaDownload } from "react-icons/fa"; // Import the download icon
import { Config } from "../config";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 150px)",
    background: "#121212",
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    textAlign: "left",
    padding: "2rem",
    borderRadius: "10px",
    backgroundColor: "#1e1e1e",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  fileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  label: {
    fontSize: "1.2rem",
    color: "#999",
  },
  value: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  filesize: {
    fontSize: "1.4rem",
    color: "#666",
    marginBottom: "0.5rem",
  },
  visits: {
    fontSize: "1.2rem",
    color: "#999",
    marginBottom: "1rem",
  },
  downloadButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  downloadButton: {
    padding: "10px 20px",
    fontSize: "1.4rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease",
  },
  downloadIcon: {
    marginRight: "0.5rem",
    fontSize: "1.2rem",
  },
  errorContainer: {
    marginTop: "2rem",
    fontSize: "1.4rem",
    color: "red",
  },
};

const ViewFile = () => {
  const { id } = useParams();
  const [fileInfo, setFileInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${Config.API_URL}/view/${id}`)
      .then((response) => {
        setFileInfo(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("File not found");
        } else {
          setError("An error occurred while fetching file data");
        }
      });
  }, [id]);

  const handleDownload = () => {
    if (fileInfo) {
      window.open(fileInfo.path, "_blank");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {fileInfo ? (
          <div style={styles.fileInfo}>
            <div style={styles.label}>Name:</div>
            <div style={styles.value}>{fileInfo.filename}</div>
            <div style={styles.label}>Size:</div>
            <div style={styles.filesize}>{fileInfo.filesize}</div>
            <div style={styles.label}>Total Downloads:</div>
            <div style={styles.visits}>{fileInfo.visits}</div>
          </div>
        ) : (
          <div style={styles.errorContainer}>{error || "Loading..."}</div>
        )}
        {fileInfo && (
          <div style={styles.downloadButtonContainer}>
            <button style={styles.downloadButton} onClick={handleDownload}>
              <FaDownload style={styles.downloadIcon} />
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFile;
