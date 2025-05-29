from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

class UserBase(BaseModel):
    username: str
    email: EmailStr
    roles: Optional[List[str]] = Field(default_factory=list)
    is_active: Optional[bool] = True

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str]

class UserInDB(UserBase):
    id: Optional[str] = Field(alias="_id")
    hashed_password: str
    createdAt: Optional[datetime]
    updatedAt: Optional[datetime]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
