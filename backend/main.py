from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import traceback
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

#   Load system instruction from file
with open("system_instruction.txt", "r") as f:
    system_instruction = f.read()

#   Configure Gemini API key (use env variable)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

#   Initialize model
model = genai.GenerativeModel("gemini-1.5-flash")

#   Start persistent chat session with system instruction
chat_session = model.start_chat(history=[
    {
        "role": "user",
        "parts": [{"text": system_instruction}]
    }
])

@app.route("/")
def home():
    return "  Gemini-backed Flask server is running."

@app.route("/chat", methods=["POST"])
def chat_route():
    try:
        data = request.get_json()
        user_input = data.get("message", "").strip()

        if not user_input:
            return jsonify({"error": "No message provided"}), 400

        #   Send user input to Gemini session
        response = chat_session.send_message(user_input)
        reply = response.text

        return jsonify({"reply": reply})

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": f"{type(e).__name__}: {str(e)}"}), 500

@app.route("/reset", methods=["POST"])
def reset_chat():
    global chat_session
    chat_session = model.start_chat(history=[
        {
            "role": "user",
            "parts": [{"text": system_instruction}]
        }
    ])
    return jsonify({"message": "Chat history reset."})

if __name__ == "__main__":
    print("Gemini Flask server starting...")
    app.run(debug=True)
