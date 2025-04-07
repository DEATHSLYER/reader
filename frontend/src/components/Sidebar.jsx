import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background: #111;
  border-right: 2px solid #00ff00;
  position: fixed;
  left: 0;
  top: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0px 15px rgba(0, 255, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #00ff00;
  text-align: center;
  font-family: "VT323", monospace;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 10px;
  max-height: 60vh;
  overflow-y: auto;
`;

const FileItem = styled.li`
  padding: 10px;
  background: #222;
  color: #00ff00;
  font-family: "VT323", monospace;
  font-size: 1.2rem;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #007700;
  }
`;

const UploadButton = styled.label`
  padding: 20px;
  margin-top: auto;
  margin-bottom: 40px;
  background: #00ff00;
  color: #000;
  font-family: "VT323", monospace;
  font-size: 1.3rem;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  display: block;
  transition: 0.3s ease;
  &:hover {
    background: #009900;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const Sidebar = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/files");
        setFiles(Array.isArray(res.data.files) ? res.data.files : []); // Corrected
      } catch (err) {
        console.error("Error fetching files:", err);
        setFiles([]);
      }
    };

    fetchFiles();
  }, []);

  const handleFileUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      const response = await axios.get("http://localhost:5000/api/files");
      setFiles(Array.isArray(response.data.files) ? response.data.files : []); // Corrected
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <SidebarContainer>
      <Title>Library</Title>
      <FileList>
        {files.length === 0 ? (
          <FileItem>No PDFs uploaded</FileItem>
        ) : (
          files.map((file, index) => <FileItem key={index}>{file}</FileItem>) // Fixed mapping
        )}
      </FileList>
      <UploadButton>
        Upload PDF
        <HiddenInput type="file" accept="application/pdf" onChange={handleFileUpload} />
      </UploadButton>
    </SidebarContainer>
  );
};

export default Sidebar;
