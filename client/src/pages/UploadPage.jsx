import React, { useState, useRef } from "react";
import axios from "axios";
import { Config } from "../config";
import { useNavigate } from "react-router-dom";
const styles = {
  uploadContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#121212",
  },
  uploadContent: {
    textAlign: "center",
    maxWidth: "500px",
    padding: "2rem",
    backgroundColor: "#1e1e1e",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },
  uploadHeading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "white",
  },
  uploadDescription: {
    fontSize: "1.2rem",
    color: "#777",
    marginBottom: "2rem",
  },
  inputFileWrapper: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputFile: {
    display: "none",
  },
  inputFileButton: {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "1.2rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  inputFileButtonText: {
    pointerEvents: "none",
  },
  selectedFile: {
    marginBottom: "1rem",
    color: "white",
  },
  errorText: {
    color: "red",
    marginTop: "1rem",
  },
  uploadButton: {
    display: "block",
    width: "100%",
    padding: "10px 20px",
    fontSize: "1.2rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

const Upload = () => {
  const history = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const inputFileRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 100 * 1024 * 1024) {
      setSelectedFile(file);
      setUploadError(null);
    } else {
      setSelectedFile(null);
      setUploadError("File size must be less than 100MB");
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post(`${Config.API_URL}/upload`, formData)
        .then((response) => {
          const fileId = response.data.fileId; // Assuming your API returns fileId

          // Navigate to the view/fileId page
          history(`/view/${fileId}`);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setUploadError("Upload failed. Please try again.");
        });
    }
  };

  const handleChooseFileClick = () => {
    inputFileRef.current.click();
  };

  return (
    <div style={styles.uploadContainer}>
      <div style={styles.uploadContent}>
        <h1 style={styles.uploadHeading}>Upload Your File</h1>
        <p style={styles.uploadDescription}>
          Select a file to upload (less than 100MB).
        </p>
        <div style={styles.inputFileWrapper}>
          <input
            type="file"
            id="fileInput"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            ref={inputFileRef}
            style={styles.inputFile}
          />
          <button
            style={styles.inputFileButton}
            onClick={handleChooseFileClick}
          >
            <span style={styles.inputFileButtonText}>Choose File</span>
          </button>
        </div>
        {selectedFile && (
          <div style={styles.selectedFile}>
            Selected file: {selectedFile.name}
          </div>
        )}
        {uploadError && <div style={styles.errorText}>{uploadError}</div>}
        <button
          style={styles.uploadButton}
          onClick={handleUpload}
          disabled={!selectedFile || uploadError}
        >
          Upload Now
        </button>
      </div>
    </div>
  );
};

export default Upload;
