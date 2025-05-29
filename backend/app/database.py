from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

MONGO_CLIENT = AsyncIOMotorClient(settings.MONGODB_URL)
db = MONGO_CLIENT.get_default_database()

def get_database():
    return db
