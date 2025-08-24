﻿from fastapi import APIRouter, HTTPException, Query, Depends
from bson import ObjectId
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from pydantic import BaseModel

from backend.database import get_db
from backend.schemas import ReviewSchema
from backend.deps import get_current_admin

router = APIRouter(tags=["reviews"])

# ----------------------------
# Schemas
# ----------------------------
class ReviewCreate(BaseModel):
    name: str
    rating: float
    comment: str
    published: bool = True

class ReviewUpdate(BaseModel):
    name: Optional[str] = None
    rating: Optional[float] = None
    comment: Optional[str] = None
    published: Optional[bool] = None

# ----------------------------
# Helpers
# ----------------------------
def _doc_to_review_out(doc: Dict[str, Any]) -> ReviewSchema:
    return ReviewSchema(
        _id=str(doc["_id"]),
        name=doc["name"],
        rating=doc["rating"],
        comment=doc["comment"],
        published=bool(doc.get("published", True)),
        created_at=doc.get("created_at", datetime.now(timezone.utc)),
    )

# ----------------------------
# Routes
# ----------------------------
@router.get("/", response_model=List[ReviewSchema])
async def list_reviews(
    published: Optional[bool] = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db=Depends(get_db)
):
    """Get a list of reviews, optionally filtered by published status"""
    q: Dict[str, Any] = {}
    if published is not None:
        q["published"] = published

    cursor = db.reviews.find(q).sort("created_at", -1).skip(offset).limit(limit)
    reviews: List[ReviewSchema] = []
    async for doc in cursor:
        reviews.append(_doc_to_review_out(doc))
    
    return reviews

@router.post("/", response_model=ReviewSchema)
async def create_review(review: ReviewCreate, db=Depends(get_db)):
    """Create a new review"""
    data = review.dict()
    data["created_at"] = datetime.now(timezone.utc)

    result = await db.reviews.insert_one(data)
    new_review = await db.reviews.find_one({"_id": result.inserted_id})
    return _doc_to_review_out(new_review)

@router.get("/{review_id}", response_model=ReviewSchema)
async def get_review(review_id: str, db=Depends(get_db)):
    """Get a single review by ID"""
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=404, detail="Review not found")

    review = await db.reviews.find_one({"_id": ObjectId(review_id)})
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    return _doc_to_review_out(review)

@router.put("/{review_id}", response_model=ReviewSchema)
async def update_review(
    review_id: str, 
    review: ReviewUpdate,
    db=Depends(get_db),
    _admin=Depends(get_current_admin)
):
    """Update a review (admin only)"""
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=404, detail="Review not found")

    updates = review.dict(exclude_unset=True)
    if updates:
        result = await db.reviews.update_one(
            {"_id": ObjectId(review_id)},
            {"$set": updates}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Review not found")

    updated = await db.reviews.find_one({"_id": ObjectId(review_id)})
    return _doc_to_review_out(updated)

@router.delete("/{review_id}")
async def delete_review(
    review_id: str,
    db=Depends(get_db),
    _admin=Depends(get_current_admin)
):
    """Delete a review (admin only)"""
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=404, detail="Review not found")

    result = await db.reviews.delete_one({"_id": ObjectId(review_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")

    return {"message": "Review deleted successfully"}
