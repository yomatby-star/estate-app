from datetime import datetime, timezone
from fastapi import UploadFile
from app.core.firebase_admin import get_firebase_client
from app.schemas.room import RoomCreateRequest
from app.service.room_image_service import upload_room_image

def create_room(
    request: RoomCreateRequest,
    files: list[UploadFile],
    uid: str,
):
  db = get_firebase_client()
  room_ref = db.collection("rooms").document()
  now = datetime.now(timezone.utc)# 共通化

  images = []

  for file in files:
    image_data = upload_room_image(
      file=file,
      room_id=room_ref.id
    )
    images.append(image_data)

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
    "images": images,
    "created_at": now,
    "updated_at": now,
  }

  room_ref.set(data)

  return data