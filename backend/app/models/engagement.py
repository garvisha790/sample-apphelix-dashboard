from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

class MSA(BaseModel):
    reference: Optional[str]
    value: Optional[float]
    startDate: Optional[datetime]
    endDate: Optional[datetime]
    documents: Optional[List[str]]

class SOW(BaseModel):
    reference: Optional[str]
    value: Optional[float]
    startDate: Optional[datetime]
    endDate: Optional[datetime]
    documents: Optional[List[str]]

class AIInsights(BaseModel):
    sentiment_score: Optional[float]
    key_topics: Optional[List[str]]
    risk_factors: Optional[List[str]]

class EngagementBase(BaseModel):
    customerId: str = Field(..., alias="customerId")
    name: str
    type: Optional[str]
    status: Optional[str] = Field(default="active")
    ryg_status: Optional[str]
    msa: Optional[MSA]
    sow: Optional[SOW]
    description: Optional[str]

class EngagementCreate(EngagementBase):
    pass

class EngagementUpdate(EngagementBase):
    pass

class EngagementInDB(EngagementBase):
    id: Optional[str] = Field(alias="_id")
    createdAt: Optional[datetime]
    updatedAt: Optional[datetime]
    lastAiAnalysis: Optional[datetime]
    aiInsights: Optional[AIInsights]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
