from app.database import SessionLocal
from app.models import Usuario

def crear_usuario_inicial():
    db = SessionLocal()
    if not db.query(Usuario).filter(Usuario.username == "admin").first():
        nuevo = Usuario(username="admin", password="1234")
        db.add(nuevo)
        db.commit()
        print("✅ Usuario admin creado (admin / 1234)")
    db.close()
