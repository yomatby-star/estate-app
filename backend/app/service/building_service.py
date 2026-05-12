from datetime import datetime, timezone
from app.core.firebase_admin import get_firebase_client
from app.schemas.property import PropertyCreateRequest

def create_building(request: PropertyCreateRequest, uid: str) -> dict:
  db = get_firebase_client()
  doc_ref = db.collection("buildings").document()
  now = datetime.now(timezone.utc)
  data = {
    "id": doc_ref.id,
    "uid": uid,
    "basic": request.basic.model_dump(),
    "common": request.common.model_dump(),
    "created_at": now,
    "updated_at": now,
  }
  doc_ref.set(data)
  return data