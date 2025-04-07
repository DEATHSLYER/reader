# GoReader – My AI-Powered Interactive Story Reader 🎙️📚

GoReader is something I’ve built to reimagine how we read and experience stories. It’s an AI-driven reading app that not only lets you upload and read books but also narrates them in a dynamic, emotionally aware way. The design is clean, playful, and responsive with two unique modes — Reader and Narrator.

---

## 🔧 Tech Stack I Used

- **Frontend**: React (Vite) + TailwindCSS + Styled Components
- **Backend**: Node.js + Express
- **AI/ML**: Hugging Face Transformers (DialoGPT for story continuation, DistilRoBERTa for emotion detection)
- **Voice Synthesis**: Custom speech module
- **Database**: PostgreSQL
- **AI Pipeline**: Async architecture with Rasa handling the NLP logic

---

## 💡 Key Features

- Drag-and-drop upload for PDFs/Books
- Real-time AI storytelling with changing tone
- Interactive voice controls (cassette/vinyl-style button)
- Emotion-aware narration powered by transformers
- Reader Mode & Noir-style Narrator Mode
- Word lookup feature in Narrator Mode
- Dark/Light mode toggle

---

## 📁 Project Structure

```bash
src/
├── components/
│   ├── Sidebar.jsx
│   ├── UploadBox.jsx
│   ├── StoryDisplay.jsx
│   ├── AudioControls.jsx
│   └── ModeToggle.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ReaderPage.jsx
│   └── NarratorPage.jsx
├── styles/
│   ├── GlobalStyles.js
│   ├── HomeStyles.js
│   ├── ReaderStyles.js
│   └── ComponentsStyles.js
├── App.jsx
├── main.jsx
└── router.jsx


git clone https://github.com/yourusername/goreader-app.git
cd goreader-app
npm install
npm run dev
