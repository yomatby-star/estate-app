from datetime import datetime, timezone
from app.core.firebase_admin import get_firebase_client
from app.schemas.room import RoomCreateRequest

def create_room(
    request: RoomCreateRequest,
    uid: str,
):
  db = get_firebase_client()
  building_ref = db.collection("buildings").document(request.building_id)
  room_ref = building_ref.collection("rooms").document()
  now = datetime.now(timezone.utc)

  data = {
    "id": room_ref,
    "building_id": request.building_id,
    "uid": uid,
    "roomNumber": request.room.roomNumber,
    "rent": request.room.rent,
    "status": request.room.status,
    "created_at": now,
    "updated_ut": now,
  }

  room_ref.set(data)

  return data