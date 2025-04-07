import { useState, useEffect } from "react";
import axios from "axios";
import { StoryContainer, NavButtons } from "../styles/ComponentsStyles";

const StoryDisplay = ({ selectedStoryId }) => {
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedStoryId) return;
    
    setLoading(true);
    setError(null);

    axios
    .get(`http://localhost:5000/api/stories/${selectedStoryId}`) // ✅ Fixed route
    .then((res) => {
      setChapters(res.data.chapters || []);  // ✅ Ensures we always set an array
      setCurrentChapter(0);
    })
    .catch((err) => setError("Failed to load story."))
    .finally(() => setLoading(false));
  
  }, [selectedStoryId]);

  if (error) return <StoryContainer><p>{error}</p></StoryContainer>;
  if (loading) return <StoryContainer><p>Loading story...</p></StoryContainer>;

  return (
    <StoryContainer>
      <h2>Chapter {currentChapter + 1}</h2>
      <p>{chapters[currentChapter]}</p>
      
      <NavButtons>
        <button disabled={currentChapter === 0} onClick={() => setCurrentChapter(currentChapter - 1)}>
          ◀ Previous
        </button>

        <button disabled={currentChapter === chapters.length - 1} onClick={() => setCurrentChapter(currentChapter + 1)}>
          Next ▶
        </button>
      </NavButtons>
    </StoryContainer>
  );
};

export default StoryDisplay;
