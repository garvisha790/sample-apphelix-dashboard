from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.customer import CustomerBase
from app.dependencies import get_db
from bson import ObjectId

router = APIRouter(prefix="/api/customers", tags=["customers"])

@router.get("", response_model=List[CustomerBase])
async def list_customers(db=Depends(get_db)):
    return await db.customers.find().to_list(100)

@router.get("/{id}", response_model=CustomerBase)
async def get_customer(id: str, db=Depends(get_db)):
    customer = await db.customers.find_one({"_id": ObjectId(id)})
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.post("", response_model=CustomerBase)
async def create_customer(customer: CustomerBase, db=Depends(get_db)):
    data = customer.dict(by_alias=True)
    result = await db.customers.insert_one(data)
    data["_id"] = str(result.inserted_id)
    return data

@router.put("/{id}", response_model=CustomerBase)
async def update_customer(id: str, customer: CustomerBase, db=Depends(get_db)):
    data = customer.dict(by_alias=True, exclude_unset=True)
    result = await db.customers.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": data}, return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Customer not found")
    return result

@router.delete("/{id}")
async def delete_customer(id: str, db=Depends(get_db)):
    result = await db.customers.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    return {"msg": "Deleted"}

@router.get("/search")
async def search_customers(q: str, db=Depends(get_db)):
    # Placeholder: Use MongoDB text index for search
    return await db.customers.find({"$text": {"$search": q}}).to_list(100)
