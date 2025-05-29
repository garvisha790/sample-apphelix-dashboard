from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    MONGODB_URL: str
    AZURE_CLIENT_ID: str
    AZURE_CLIENT_SECRET: str
    AZURE_TENANT_ID: str
    JWT_SECRET_KEY: str
    UPLOAD_DIR: str = './uploads'
    AI_SERVICE_API_KEY: Optional[str]

    class Config:
        env_file = os.path.abspath(os.path.join(os.path.dirname(__file__), '../.env'))

settings = Settings()
