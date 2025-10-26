from fastapi import FastAPI, HTTPException
import uvicorn
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.AIChatbot import chatbot
from app.api.routes.SentimentAnalysis import sentiment
from app.api.routes.StockData import stock_data


from chromadb import PersistentClient
from chromadb.config import Settings


import google.generativeai as genai


load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


chroma_client = PersistentClient(path="./db")
collection = chroma_client.get_or_create_collection(name="fintech_docs")


app = FastAPI()


origins = [
    os.getenv("FRONTEND_URL"),
    os.getenv("TYPESCRIPT_BACKEND_URL")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(chatbot.router, prefix="/api/v1/chatbot", tags=["chatbot"])
app.include_router(sentiment.router, prefix="/api/v1/news", tags=["sentiment"])
app.include_router(stock_data.router, prefix="/api/v1/stocks", tags=["stocks"])


@app.get("/")
def root():
    return {"message": "Welcome to FinTechFore Python Backend", "status": "Ok"}

# 🔍 Chroma vector search using Gemini embeddings
@app.get("/chroma-search")
def chroma_search(q: str):
    try:
        embedding = genai.embed_content(
            model="models/embedding-001",
            content=q
        )["embedding"]
        result = collection.query(query_embeddings=[embedding], n_results=3)
        return result["documents"][0] if "documents" in result else []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
