import logging
from fastapi import APIRouter, Depends, HTTPException, Query

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/images", tags=["images"])

@router.get("/url")
async def get_image_url(image_key: str = Query(...)):
    image_url = "承認付きURL"
    print("image_url:", image_url)
    return {
        "url": image_url
    }