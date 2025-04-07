import { useState } from "react";
import { NarratorContainer, Title } from "../styles/ReaderStyles";
import ModeToggle from "../components/ModeToggle";
import VoiceControls from "../components/VoiceControls";
import Sidebar from "../components/Sidebar";
import VoiceCommandButton from "../components/VoiceCommandButton";
import StoryDisplay from "../components/StoryDisplay"; // ✅ Import StoryDisplay
import { motion } from "framer-motion";

const pageTransition = {
  initial: { opacity: 0, x: 60, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, x: -60, scale: 0.95, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
};

const NarratorPage = ({ toggleMode }) => {
  const [tone, setTone] = useState("serious");
  const [emotion, setEmotion] = useState("neutral");
  const [speed, setSpeed] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleVoiceCommand = (command) => {
    if (command.includes("happy")) setEmotion("happy");
    else if (command.includes("angry")) setEmotion("angry");
    else if (command.includes("slow down")) setSpeed((prev) => Math.max(0.5, prev - 0.5));
    else if (command.includes("speed up")) setSpeed((prev) => prev + 0.5);
    else if (command.includes("serious")) setTone("serious");
    else if (command.includes("casual")) setTone("casual");
  };

  return (
    <motion.div {...pageTransition}>
      <NarratorContainer>
        <Sidebar />
        <Title>Narrator Mode</Title>
        <p>AI is narrating the story...</p>
        <StoryDisplay /> {/* ✅ Show Story Text */}
        <ModeToggle toggleMode={toggleMode} isNarrator={true} />
        <VoiceCommandButton onCommand={handleVoiceCommand} />
        <VoiceControls
          isOpen={isPopupOpen}
          togglePopup={() => setIsPopupOpen(!isPopupOpen)}
          setTone={setTone}
          setEmotion={setEmotion}
          setSpeed={setSpeed}
        />
      </NarratorContainer>
    </motion.div>
  );
};

export default NarratorPage;
