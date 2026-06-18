from datetime import datetime, timezone
from fastapi import UploadFile
from app.core.firebase_admin import get_firebase_client
from app.schemas.room import RoomCreateRequest

def create_room(
    request: RoomCreateRequest,
    files: list[UploadFile],
    uid: str,
):
  db = get_firebase_client()
  room_ref = db.collection("rooms").document()
  
  now = datetime.now(timezone.utc)

  image_keys = []
  for file in files:
    print(file.filename)

  data = {
    "id": room_ref.id,
    "building_id": request.building_id,
    "uid": uid,
    "roomNumber": request.room.roomNumber,
    "rent": request.room.rent,
    "managementFee": request.room.managementFee,
    "securityDeposit": request.room.securityDeposit,
    "keyMoney": request.room.keyMoney,
    "floorPlan": request.room.floorPlan,
    "exclusiveArea": request.room.exclusiveArea,
    "numberFloors": request.room.numberFloors,
    "direction": request.room.direction,
    "status": request.room.status,
    "equipments": request.room.equipments,
    "created_at": now,
    "updated_at": now,
  }

  room_ref.set(data)

  return data