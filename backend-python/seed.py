import os
from chromadb import PersistentClient
from chromadb.config import Settings
import google.generativeai as genai
from dotenv import load_dotenv


load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


chroma_client = PersistentClient(path="./db")
collection = chroma_client.get_or_create_collection(name="fintech_docs")


docs = [
    {"id": "1", "text": "What is FinTechForge? It's a modular open-source platform for building AI-powered financial tools, insights, and dashboards."},
    {"id": "2", "text": "How does FinTechForge analyze financial news? It uses Python-based sentiment analysis to detect and summarize market sentiment."},
    {"id": "3", "text": "How to get started with FinTechForge? Clone the repo, set up backend (Node.js + Python), and run the frontend React dashboard."},
    {"id": "4", "text": "Which AI models are used in FinTechForge? It uses machine learning and generative models to power financial insights and assistants."},
    {"id": "5", "text": "How secure is the platform? FinTechForge uses a Node.js-based authentication system to ensure secure access to user data."},
    {"id": "6", "text": "How to install the backend? Navigate to backend-node or backend-python folders, install dependencies, and run respective servers."},
    {"id": "7", "text": "What tech stack does FinTechForge use? React for frontend, Node.js for auth/backend APIs, Python for AI, MongoDB for data."},
    {"id": "8", "text": "How can I contribute to FinTechForge? Fork the repo, explore good first issues, and read the CONTRIBUTING.md file."},
    {"id": "9", "text": "What is the purpose of the dashboard? It displays real-time financial data, trends, and visualizations using a sleek UI."},
    {"id": "10", "text": "What does the modular architecture mean? You can add new features like portfolio trackers, chatbots, or prediction engines easily."},
    {"id": "11", "text": "How does the sentiment analysis feature work? It uses NLP to classify news as positive, neutral, or negative."},
    {"id": "12", "text": "How to reset your password in FinTechForge? Use the forgot password flow handled by the secure Node.js backend."},
    {"id": "13", "text": "What future features are planned for FinTechForge? Portfolio recommendation engine, stock/crypto prediction, live API integrations."},
    {"id": "14", "text": "How does the chatbot assistant help? It answers finance-related questions, explains features, and helps with onboarding."},
    {"id": "15", "text": "Where is the documentation for developers? Inside the /docs folder with API routes, structure, and diagrams."},
    {"id": "16", "text": "What are the minimum prerequisites to run this project? Node.js v18+, Python 3.10+, MongoDB, npm, pip, and Git."},
    {"id": "17", "text": "How is financial data visualized? Through interactive and responsive React dashboards using charts and tables."},
    {"id": "18", "text": "What is the licensing model? FinTechForge is MIT licensed and open to public contributions and forks."},
    {"id": "19", "text": "what is value of A? value of A is 10"},
    {"id": "20", "text": "Can I extend the project with my own financial tools? Yes, thanks to its modular and API-based design."}
]


for doc in docs:
    embedding = genai.embed_content(
        model="models/embedding-001",
        content=doc["text"]
    )["embedding"]
    collection.upsert(documents=[doc["text"]], embeddings=[embedding], ids=[doc["id"]])


print("✅ Vector DB seeded successfully using Gemini.")
print(f"Total docs in DB: {len(collection.get()['ids'])}")
