from fastapi import APIRouter, HTTPException,Request
from .helper import finance_chatbot

router = APIRouter()

@router.get("/chat")
# use Request when you want access (eg., for logging, auth) 
async def sentiment(request:Request,query: str):
    # you want cilent ip address
    client_ip = request.client.host
    print(f"Request from IP: {client_ip}")
    return {"message": "OK"}
    try:
        result = finance_chatbot(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
