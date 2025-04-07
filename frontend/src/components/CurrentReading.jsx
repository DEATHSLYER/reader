import { useState } from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background: ${(props) => (props.isNarrator ? "#111" : "#222")};
  border-right: 2px solid ${(props) => (props.isNarrator ? "#888" : "#ffdd55")};
  position: fixed;
  left: 0;
  top: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: ${(props) => (props.isNarrator ? "#ccc" : "#ffcc44")};
  text-align: center;
  font-family: "Courier New", monospace;
  letter-spacing: 2px;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 10px;
  max-height: 60vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${(props) => (props.isNarrator ? "#888 #111" : "#ffcc44 #222")};

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => (props.isNarrator ? "#888" : "#ffcc44")};
    border-radius: 3px;
  }
`;

const FileItem = styled.li`
  padding: 10px;
  background: ${(props) => (props.isNarrator ? "#222" : "#333")};
  color: ${(props) => (props.isNarrator ? "#ccc" : "#ffcc44")};
  font-family: "Courier New", monospace;
  font-size: 1.2rem;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, opacity 0.4s ease-in-out;
  opacity: 0;
  animation: fadeIn 0.5s forwards;

  &:hover {
    background: ${(props) => (props.isNarrator ? "#444" : "#aa8800")};
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Sidebar = ({ isNarrator }) => {
  const [files, setFiles] = useState([]);

  return (
    <SidebarContainer isNarrator={isNarrator}>
      <Title isNarrator={isNarrator}>Library</Title>
      <FileList>
        {files.length === 0 ? (
          <FileItem isNarrator={isNarrator}>No PDFs uploaded</FileItem>
        ) : (
          files.map((file, index) => <FileItem key={index}>{file}</FileItem>)
        )}
      </FileList>
    </SidebarContainer>
  );
};

export default Sidebar;
