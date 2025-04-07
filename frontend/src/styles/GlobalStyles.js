import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => (theme.darkMode ? "#121212" : "#ffffff")};
    color: ${({ theme }) => (theme.darkMode ? "#E0E0E0" : "#222222")};
    font-family: 'Poppins', sans-serif;
    transition: background 0.3s ease, color 0.3s ease;
  }

  button {
    background: ${({ theme }) => (theme.darkMode ? "#333" : "#ddd")};
    color: ${({ theme }) => (theme.darkMode ? "#fff" : "#000")};
    border: 1px solid ${({ theme }) => (theme.darkMode ? "#555" : "#bbb")};
    transition: all 0.3s ease;
    
    &:hover {
      background: ${({ theme }) => (theme.darkMode ? "#444" : "#ccc")};
    }
  }
`;

export default GlobalStyles;
