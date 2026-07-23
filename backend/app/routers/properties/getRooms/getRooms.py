import logging
from fastapi import APIRouter, Depends, HTTPException
from app.core.firebase_admin import get_firebase_client

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/rooms", tags=["rooms"])

@router.get("/detail/{room_id}")
async def get_room(room_id: str):
    db = get_firebase_client()
    doc = db.collection("rooms").document(room_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="部屋登録がありません")
    room = doc.to_dict()
    room["id"] = doc.id
    
    return room

@router.get("/{building_id}")
async def get_rooms(building_id: str):
    db = get_firebase_client()
    docs = (
        db.collection("rooms")
        .where("building_id", "==", building_id)
        .stream()
    )
    
    rooms = []

    for doc in docs:
        room = doc.to_dict()
        room["id"] = doc.id
        rooms.append(room)
    
    print("rooms:", rooms)
    return rooms

