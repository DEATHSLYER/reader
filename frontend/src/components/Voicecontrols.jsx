import { useState } from "react";
import styled from "styled-components";

const PopupContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(10, 10, 10, 0.95);
  border: 1px solid #008f11;
  box-shadow: 2px 2px 15px rgba(0, 143, 17, 0.5);
  padding: 15px;
  border-radius: 8px;
  font-family: "VT323", monospace;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  width: 280px;
  z-index: 100;
  transition: all 0.3s ease-in-out;
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const ControlButton = styled.button`
  background: #006400;
  color: #00ff00;
  font-size: 1.2rem;
  font-family: "VT323", monospace;
  padding: 10px;
  margin: 8px;
  width: 90%;
  cursor: pointer;
  border: 1px solid #00aa00;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #009900;
    color: #ffffff;
  }
`;

const SelectBox = styled.select`
  width: 90%;
  padding: 10px;
  margin: 8px;
  font-size: 1.2rem;
  font-family: "VT323", monospace;
  background: #111;
  color: #00ff00;
  border: 1px solid #00aa00;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #222;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background: #111;
  color: #00ff00;
  border: 2px solid #008f11;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #222;
  }
`;

const VoiceControlPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emotion, setEmotion] = useState("Neutral");
  const [genre, setGenre] = useState("Default");
  const [speed, setSpeed] = useState("Normal");
  const [voice, setVoice] = useState("Standard");

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        Settings
      </ToggleButton>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <PopupContainer isOpen={isOpen}>
        <h2 style={{ color: "#00ff00" }}>Voice Controls</h2>
        
        <SelectBox value={emotion} onChange={(e) => setEmotion(e.target.value)}>
          <option>Neutral</option>
          <option>Happy</option>
          <option>Sad</option>
          <option>Angry</option>
          <option>Excited</option>
        </SelectBox>

        <SelectBox value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option>Default</option>
          <option>Fantasy</option>
          <option>Horror</option>
          <option>Comedy</option>
          <option>Adventure</option>
        </SelectBox>

        <SelectBox value={speed} onChange={(e) => setSpeed(e.target.value)}>
          <option>Slow</option>
          <option>Normal</option>
          <option>Fast</option>
        </SelectBox>

        <SelectBox value={voice} onChange={(e) => setVoice(e.target.value)}>
          <option>Standard</option>
          <option>Deep</option>
          <option>Soft</option>
          <option>Robotic</option>
        </SelectBox>

        <ControlButton onClick={() => setIsOpen(false)}>❌ Close</ControlButton>
      </PopupContainer>
    </>
  );
};

export default VoiceControlPanel;
