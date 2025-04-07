import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const MicContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
`;

const MicButton = styled.button`
  background: ${({ listening }) => (listening ? "#ff4444" : "#00ff00")};
  border: none;
  border-radius: 50%;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 15px ${({ listening }) => (listening ? "#ff4444" : "#00ff00")};
  transition: 0.3s ease;
  position: relative;

  &:hover {
    background: ${({ listening }) => (listening ? "#cc0000" : "#009900")};
  }

  svg {
    color: black;
    font-size: 30px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    border: 4px solid transparent;
    ${({ listening }) =>
      listening &&
      `border-color: rgba(255, 255, 255, 0.4);
       animation: pulse 1.2s infinite;`}
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.6; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const VoiceCommandButton = ({ onCommand }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", transcript);
      onCommand(transcript);
    };

    recognitionRef.current.onend = () => setListening(false);
    recognitionRef.current.onerror = () => setListening(false);
  }, [onCommand]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          setListening(true);
          recognitionRef.current.start();
        })
        .catch(() => {
          alert("Microphone access denied. Please enable it in your browser.");
        });
    }
  };

  return (
    <MicContainer>
      <MicButton listening={listening} onClick={toggleListening}>
        {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
      </MicButton>
    </MicContainer>
  );
};

export default VoiceCommandButton;
