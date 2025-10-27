from typing import Dict, List, Optional
from pydantic import BaseModel
from datetime import datetime
import uuid

class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime

class SessionManager:
    def __init__(self):
        self.sessions: Dict[str, List[Message]] = {}
    
    def create_session(self) -> str:
        session_id = str(uuid.uuid4())
        self.sessions[session_id] = []
        return session_id
    
    def add_message(self, session_id: str, role: str, content: str):
        if session_id not in self.sessions:
            self.sessions[session_id] = []
        
        self.sessions[session_id].append(Message(
            role=role,
            content=content,
            timestamp=datetime.now()
        ))
        
        # Keep only last 10 messages to prevent memory issues
        if len(self.sessions[session_id]) > 10:
            self.sessions[session_id] = self.sessions[session_id][-10:]
    
    def get_session_history(self, session_id: str, num_messages: int = 6) -> List[Message]:
        if session_id not in self.sessions:
            return []
        return self.sessions[session_id][-num_messages:]

session_manager = SessionManager()