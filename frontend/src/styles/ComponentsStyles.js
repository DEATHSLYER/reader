import styled from "styled-components";

// Navigation Buttons
export const NavButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

// Story Container
export const StoryContainer = styled.div`
  width: 70%;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: ${({ theme }) => (theme.darkMode ? "#1e1e1e" : "#fff")};
  color: ${({ theme }) => (theme.darkMode ? "#e0e0e0" : "#222")};
  border-radius: 10px;
  box-shadow: ${({ theme }) =>
    theme.darkMode ? "0 4px 10px rgba(255, 255, 255, 0.1)" : "0 4px 10px rgba(0, 0, 0, 0.1)"};
  transition: all 0.3s ease-in-out;
`;

// Toggle Container
export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 20px;
  right: 30px;
  z-index: 10;
`;

// Use **$ prefix** to prevent errors
export const ToggleLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.$isDark ? "#fff" : "#222")};
  transition: color 0.3s ease-in-out;
`;

export const ToggleSwitch = styled.div`
  width: 50px;
  height: 26px;
  background: ${(props) => (props.$isDark ? "#4A4A4A" : "#ddd")};
  border-radius: 20px;
  padding: 3px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  .switch {
    width: 20px;
    height: 20px;
    background: ${(props) => (props.$isDark ? "#fff" : "#222")};
    border-radius: 50%;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => (props.$isDark ? "translateX(24px)" : "translateX(0)")};
  }
`;

// Narration Mode (Fixing `isNarrator` issue)
export const NarratorContainer = styled.div`
  background: ${(props) => (props.$isNarrator ? "#282c34" : "#fff")};
  color: ${(props) => (props.$isNarrator ? "#fff" : "#000")};
  transition: all 0.3s ease-in-out;
`;

// Listening Mode (Fixing `listening` issue)
export const ListeningIndicator = styled.div`
  visibility: ${(props) => (props.$listening ? "visible" : "hidden")};
  opacity: ${(props) => (props.$listening ? "1" : "0")};
  transition: opacity 0.3s ease-in-out;
`;
