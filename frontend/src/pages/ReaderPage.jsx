import { useState } from "react";
import { ReaderContainer, Title } from "../styles/ReaderStyles";
import ModeToggle from "../components/ModeToggle";
import NarratorPage from "./NarratorPage";
import Sidebar from "../components/Sidebar";
import VoiceCommandButton from "../components/VoiceCommandButton";
import StoryDisplay from "../components/StoryDisplay"; // ✅ Import StoryDisplay
import { motion } from "framer-motion";

const pageTransition = {
  initial: { opacity: 0, x: -60, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, x: 60, scale: 0.95, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
};

const ReaderPage = () => {
  const [isNarrator, setIsNarrator] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const toggleMode = () => setIsNarrator((prev) => !prev);

  const handleVoiceCommand = (command) => {
    if (command.includes("start")) setIsPlaying(true);
    else if (command.includes("stop")) setIsPlaying(false);
    else if (command.includes("slow down")) setSpeed((prev) => Math.max(0.5, prev - 0.5));
  };

  return isNarrator ? (
    <NarratorPage toggleMode={toggleMode} />
  ) : (
    <motion.div {...pageTransition}>
      <ReaderContainer>
        <Sidebar isNarrator={false} />
        <Title>Reader Mode</Title>
        <StoryDisplay /> {/* ✅ Show Story Text */}
        <p>{isPlaying ? "Story is playing..." : "Story is stopped."}</p>
        <ModeToggle toggleMode={toggleMode} isNarrator={isNarrator} />
        <VoiceCommandButton onCommand={handleVoiceCommand} />
      </ReaderContainer>
    </motion.div>
  );
};

export default ReaderPage;
