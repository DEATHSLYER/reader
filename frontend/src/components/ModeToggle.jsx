import styled from "styled-components";
import "@fontsource/vt323";

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 12px 35px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3px;
  cursor: pointer;
  transition: 0.3s;
  background: ${(props) => (props.$isNarrator ? "#020202" : "#f5f5f5")};
  color: ${(props) => (props.$isNarrator ? "#00ff00" : "#070708")};
  border: 2px dotted ${(props) => (props.$isNarrator ? "#00aa00" : "#009944")};
  text-shadow: ${(props) =>
    props.$isNarrator
      ? "0px 0px 5px #00ff00, 0px 0px 10px #00ff00, 0px 0px 15px #00ff00"
      : "0px 0px 5px #00cc66, 0px 0px 10px #009944"};  
  box-shadow: ${(props) =>
    props.$isNarrator
      ? "0px 0px 20px rgba(0, 255, 0, 0.8)"
      : "0px 0px 20px rgba(0, 204, 102, 0.8)"};
  font-family: "VT323", monospace;

  /* UNIQUE SHAPES FOR BOTH BUTTONS */
  clip-path: polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%);

  &:hover {
    background: ${(props) => (props.$isNarrator ? "#f5f5f5" : "#222222")};
    color: ${(props) => (props.$isNarrator ? "#222222" : "#00ff99")};
    border-color: ${(props) => (props.$isNarrator ? "#00ff00" : "#00bb77")};
    box-shadow: ${(props) =>
      props.$isNarrator
        ? "0px 0px 30px rgba(0, 255, 0, 1)"
        : "0px 0px 30px rgba(0, 204, 102, 1)"};
  }

  &:active {
    transform: scale(0.92);
  }
`;

const ModeToggle = ({ toggleMode, isNarrator }) => {
  return (
    <ToggleButton onClick={toggleMode} $isNarrator={isNarrator}>
      {isNarrator ? "READER MODE" : "NARRATOR MODE"}
    </ToggleButton>
  );
};

export default ModeToggle;
