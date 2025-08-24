# backend/database.py
from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

# Local connection without TLS
client = AsyncIOMotorClient(settings.MONGO_URI)

db = client[settings.MONGO_DB]

def get_db():
    return db
