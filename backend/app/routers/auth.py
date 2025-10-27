from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Usuario

router = APIRouter(prefix="/auth")

@router.post("/login")
def login(
    payload: dict = Body(...),
    db: Session = Depends(get_db)
):
    username = payload.get("username")
    password = payload.get("password")
    
    if not username or not password:
        raise HTTPException(status_code=400, detail="Faltan credenciales")
    
    user = db.query(Usuario).filter(Usuario.username == username).first()
    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    return {"message": "Login exitoso", "user": user.username}

