# Ripan's Portfolio Chatbot

This is a full-stack portfolio chatbot project that acts as a conversational assistant for Ripandeep Kaur (Ripan). It is designed to answer questions about Ripan’s background, technical skills, projects, education, interests, and more—through natural, conversational interactions.

## Purpose

The goal of this project is to:

- Provide an interactive way for people (recruiters, professors, peers) to learn about Ripan.
- Showcase her professional experience, academic journey, and technical expertise through a fun chatbot interface.
- Explore full-stack development and the integration of LLMs like Gemini with custom conversational logic.

## Tech Stack

### Frontend
- **React**: Used to build a dynamic, responsive user interface.
- **CSS**: Custom styling inspired by modern portfolio aesthetics (blue vintage type, tile-like patterns).
- **Fetch API**: Used to communicate with the backend via HTTP POST requests.

### Backend
- **Flask** (Python): Lightweight web framework to handle chat requests and serve the Gemini model responses.
- **Google Generative AI SDK** (`google.generativeai`): Official Python SDK to access the Gemini 1.5 Flash model for generating chatbot responses.
- **Flask-CORS**: Middleware to allow cross-origin requests from the frontend.

### Environment Management
- **Python Virtual Environment**: Isolated backend environment.
- **`.env` File**: Stores API key securely and is excluded from version control using `.gitignore`.

## Key Features

- **Natural Language Chatbot**: Users can ask any question about Ripan’s experience, education, or interests.
- **System-Prompt Customization**: The assistant responds with personality, prioritizes recent experience, and reacts to specific triggers (e.g., defending FC Barcelona).
- **Persistent Conversation State**: Conversations are maintained using `start_chat()` sessions.
- **Predefined Prompt Buttons**: On launch, users can choose from common prompt categories (e.g., “See her projects”, “What are her interests?”).

## Security Notes

- The Google API key is stored in a `.env` file and not committed to the repository.
- A `.gitignore` is used to ensure sensitive files (like `vertex-key.json`) are excluded from version control.
- Push protection is enforced to prevent secrets from being leaked.

Here's the corrected and cleanly formatted **"Getting Started"** section for your `README.md`:

---

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/rripan/ripan-portfolio-chatbot.git
cd ripan-portfolio-chatbot
```

### 2. Set Up Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # For Mac/Linux
# On Windows: venv\Scripts\activate

pip install -r requirements.txt

# Create a .env file and add your Gemini API key
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Run the Flask server
python main.py
```

### 3. Set Up Frontend

```bash
cd ../frontend
npm install
npm start
```

* The React frontend will run at `http://localhost:3000`
* The Flask backend runs at `http://localhost:5000`
