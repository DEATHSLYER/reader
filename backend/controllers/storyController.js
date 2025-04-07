import Story from "../models/Story.js";

// Get all stories
export const getStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single story
export const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    res.json(story);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Upload a new story
export const uploadStory = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newStory = new Story({ title, content });

    await newStory.save();
    res.status(201).json({ message: "Story uploaded", story: newStory });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
