from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
from bson import ObjectId

class Location(BaseModel):
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    zipCode: Optional[str]

class ContactInfo(BaseModel):
    phone: Optional[str]
    email: Optional[EmailStr]
    website: Optional[str]

class CustomerBase(BaseModel):
    name: str
    industry: Optional[str]
    location: Optional[Location]
    contactInfo: Optional[ContactInfo]
    logo: Optional[str]
    status: Optional[str] = Field(default="active")
    description: Optional[str]

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(CustomerBase):
    pass

class CustomerInDB(CustomerBase):
    id: Optional[str] = Field(alias="_id")
    createdAt: Optional[datetime]
    updatedAt: Optional[datetime]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
