from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.engagement import EngagementBase
from app.dependencies import get_db
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/api/engagements", tags=["engagements"])

@router.get("", response_model=List[EngagementBase])
async def list_engagements(db=Depends(get_db)):
    return await db.engagements.find().to_list(100)

@router.get("/{id}", response_model=EngagementBase)
async def get_engagement(id: str, db=Depends(get_db)):
    engagement = await db.engagements.find_one({"_id": ObjectId(id)})
    if not engagement:
        raise HTTPException(status_code=404, detail="Engagement not found")
    return engagement

@router.post("", response_model=EngagementBase)
async def create_engagement(engagement: EngagementBase, db=Depends(get_db)):
    data = engagement.dict(by_alias=True)
    data["createdAt"] = datetime.utcnow()
    data["updatedAt"] = datetime.utcnow()
    result = await db.engagements.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return data

@router.put("/{id}", response_model=EngagementBase)
async def update_engagement(id: str, engagement: EngagementBase, db=Depends(get_db)):
    data = engagement.dict(by_alias=True, exclude_unset=True)
    data["updatedAt"] = datetime.utcnow()
    result = await db.engagements.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": data}, return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Engagement not found")
    return result

@router.delete("/{id}")
async def delete_engagement(id: str, db=Depends(get_db)):
    result = await db.engagements.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Engagement not found")
    return {"msg": "Deleted"}

@router.get("/search")
async def search_engagements(q: str, db=Depends(get_db)):
    # Placeholder: Use MongoDB text index for search
    return await db.engagements.find({"$text": {"$search": q}}).to_list(100)
