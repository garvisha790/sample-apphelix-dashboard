from fastapi import Depends
from app.database import get_database
from app.config import settings

def get_db():
    return get_database()

def get_settings():
    return settings
