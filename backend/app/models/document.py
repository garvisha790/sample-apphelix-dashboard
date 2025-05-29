from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from bson import ObjectId

class AIExtracted(BaseModel):
    text_content: Optional[str]
    action_items: Optional[List[Dict[str, Any]]]
    sentiment: Optional[str]
    key_metrics: Optional[Dict[str, Any]]

class DocumentBase(BaseModel):
    engagementId: str = Field(..., alias="engagementId")
    filename: str
    originalName: str
    fileType: str
    mimeType: str
    size: int
    filePath: str
    uploadedBy: str
    uploadedAt: Optional[datetime]
    processedAt: Optional[datetime]
    aiExtracted: Optional[AIExtracted]

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(DocumentBase):
    pass

class DocumentInDB(DocumentBase):
    id: Optional[str] = Field(alias="_id")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
