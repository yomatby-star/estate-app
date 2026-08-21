import logging
from datetime import datetime, timezone
from fastapi import UploadFile
from app.core.firebase_admin import get_firebase_client
from app.schemas.property import PropertyCreateRequest, PropertyUpdateRequest
from app.service.building_image_service import upload_building_image, delete_building_image

logger = logging.getLogger(__name__)


def create_building(
    request: PropertyCreateRequest,
    uid: str,
    file: UploadFile | None = None,
) -> dict:
  db = get_firebase_client()
  # 共通化できる
  doc_ref = db.collection("buildings").document()

  now = datetime.now(timezone.utc)
  # 共通化できる

  images = []

  if file:
    image_data = upload_building_image(
      file=file,
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


def update_building(
    building_id: str,
    request: PropertyUpdateRequest,
    files: list[UploadFile] | None = None,
) -> dict:
  db = get_firebase_client()
  # 共通化できる
  doc_ref = db.collection("buildings").document(building_id)

  now = datetime.now(timezone.utc)
  # 共通化できる

  current_doc = doc_ref.get()
  current_images = current_doc.to_dict().get("images", []) if current_doc.exists else []

  removed_keys = set(request.removedImageKeys)
  images = []
  keys_to_delete = []

  for image in current_images:
    if image.get("image_key") in removed_keys:
      keys_to_delete.append(image.get("image_key"))
    else:
      images.append(image)

  for file in files or []:
    image_data = upload_building_image(
      file=file,
      building_id=building_id
    )
    images.append(image_data)

  data = {
    "basic": request.basic.model_dump(),
    "common": request.common.model_dump(),
    "images": images,
    "updated_at": now,
  }

  # Firestoreの更新が確定した後にのみB2の古い画像を削除する
  # (削除を先に行うとFirestore更新が失敗した際に実体のない画像を参照し続けてしまうため)
  doc_ref.update(data)

  for image_key in keys_to_delete:
    try:
      delete_building_image(image_key)
    except Exception:
      logger.exception(f"B2画像削除に失敗しました: image_key={image_key}")

  return {
    "id": building_id,
    **data,
  }