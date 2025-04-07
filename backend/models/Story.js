import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Story = mongoose.model("Story", storySchema);

export default Story;
