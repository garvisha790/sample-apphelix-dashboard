from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from typing import List
from app.models.document import DocumentBase
from app.dependencies import get_db, get_settings
from bson import ObjectId
from datetime import datetime
import os

router = APIRouter(prefix="/api/documents", tags=["documents"])

@router.get("", response_model=List[DocumentBase])
async def list_documents(db=Depends(get_db)):
    return await db.documents.find().to_list(100)

@router.get("/{id}", response_model=DocumentBase)
async def get_document(id: str, db=Depends(get_db)):
    doc = await db.documents.find_one({"_id": ObjectId(id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@router.post("/upload", response_model=DocumentBase)
async def upload_document(
    engagementId: str,
    file: UploadFile = File(...),
    db=Depends(get_db),
    settings=Depends(get_settings)
):
    upload_dir = settings.UPLOAD_DIR
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    doc = {
        "engagementId": engagementId,
        "filename": file.filename,
        "contentType": file.content_type,
        "path": file_path,
        "uploadedAt": datetime.utcnow(),
        "size": len(content)
    }
    result = await db.documents.insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return doc
