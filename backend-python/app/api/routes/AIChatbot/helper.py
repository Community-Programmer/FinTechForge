import os
from dotenv import load_dotenv
import google.generativeai as genai
from .session_manager import session_manager
from .financial_knowledge import financial_kb

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def finance_chatbot(query: str, session_id: str):
    # Get recent conversation history
    recent_messages = session_manager.get_session_history(session_id)
    
    # Format conversation history
    history_context = ""
    if recent_messages:
        history_context = "Recent conversation:\n"
        for msg in recent_messages:
            history_context += f"{msg.role.title()}: {msg.content}\n"
    
    # Find relevant financial terms in the query
    detected_terms_context = ""
    query_lower = query.lower()
    found_terms = []
    
    for term_name, term_obj in financial_kb.terms.items():
        if term_name.lower() in query_lower:
            found_terms.append(f"{term_obj.term}: {term_obj.definition}")
    
    if found_terms:
        detected_terms_context = "Detected financial terms:\n"
        for term_desc in found_terms:
            detected_terms_context += f"- {term_desc}\n"
    
    # Prepare the prompt with context
    prompt = f"""
    You are a Financial Chatbot. Provide financial news, market trends, real-time stock data, 
    and analyst recommendations with deep financial knowledge.
    
    {history_context}
    
    {detected_terms_context}
    
    User query: {query}
    
    Please provide a comprehensive response that includes:
    1. Relevant financial information
    2. Explanation of any financial terms mentioned
    3. Sources or citations where possible
    4. Reference previous conversation when relevant to maintain context
    5. Use tables to format financial data when appropriate
    6. Use emojis and formatting to make the response engaging
    """
    
    # Use Google's Generative AI with Flash model for higher quotas
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(prompt)
    
    # Store the conversation
    session_manager.add_message(session_id, "user", query)
    session_manager.add_message(session_id, "assistant", response.text)
    
    return response.text
