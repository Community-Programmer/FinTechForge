from fastapi import APIRouter, HTTPException
from typing import Optional
from .helper import finance_chatbot
from .session_manager import session_manager

router = APIRouter()

@router.get("/chat")
async def chat(query: str, session_id: Optional[str] = None):
    try:
        # Create new session if not provided
        if not session_id:
            session_id = session_manager.create_session()
        
        result = finance_chatbot(query, session_id)
        
        return {
            "response": result,
            "session_id": session_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/new-session")
async def new_session():
    session_id = session_manager.create_session()
    return {"session_id": session_id}