import logging
from fastapi import APIRouter, Depends, HTTPException
from app.core.firebase_admin import get_firebase_client

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/properties", tags=["properties"])

@router.get("")
async def get_properties():
    db = get_firebase_client()
    docs = db.collection("buildings").stream()
    print("docs->DocumentSnapshot:", docs)

    properties = []

    for doc in docs:
        property_data = doc.to_dict()
        print("python dict", property_data)
        property_data["id"] = doc.id
        print("python dict in ID", property_data)

        properties.append(property_data)

    print("properties:", properties)
    return properties
