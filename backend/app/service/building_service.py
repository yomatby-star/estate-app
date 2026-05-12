from datetime import datetime, timezone
from fastapi import UploadFile
from app.core.firebase_admin import get_firebase_client
from app.schemas.property import PropertyCreateRequest
from app.service.building_image_service import upload_building_image

def create_building(
    request: PropertyCreateRequest,
    uid: str,
    file: UploadFile | None = None,
) -> dict:
  db = get_firebase_client()
  doc_ref = db.collection("buildings").document()

  now = datetime.now(timezone.utc)

  images = []

  if file:
    image_data = upload_building_image(
      file=file,
      uid=uid,
      building_id=doc_ref.id
    )
    images.append(image_data)

  data = {
    "id": doc_ref.id,
    "uid": uid,
    "basic": request.basic.model_dump(),
    "common": request.common.model_dump(),
    "images": images,
    "created_at": now,
    "updated_at": now,
  }
  
  doc_ref.set(data)

  return data