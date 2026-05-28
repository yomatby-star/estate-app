import os
import logging
from fastapi import APIRouter, Depends, HTTPException, Query
from app.core.backblaze import get_b2_client

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/images", tags=["images"])

@router.get("/url")
async def get_image_url(image_key: str = Query(...)):
    b2_client = get_b2_client()
    image_url = b2_client.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": os.getenv("B2_BUCKET_NAME"),
            "Key": image_key
        },
        ExpiresIn=3600
    )
    # print("ここ", os.getenv("B2_BUCKET_NAME"))
    # print("image_url:", image_url)

    return {
        "url": image_url
    }