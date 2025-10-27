from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import auth
from app.utils.init_db import crear_usuario_inicial

app = FastAPI(title="login")

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",       # o ["*"] para permitir todos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear tablas en la base
Base.metadata.create_all(bind=engine)

# Crear usuario de prueba
crear_usuario_inicial()

# Registrar rutas
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Backend FastAPI funcionando correctamente"}
