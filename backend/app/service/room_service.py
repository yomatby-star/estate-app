import logging
from datetime import datetime, timezone
from fastapi import UploadFile, HTTPException
from app.core.firebase_admin import get_firebase_client
from app.schemas.room import RoomCreateRequest, RoomUpdateRequest
from app.service.room_image_service import upload_room_image, delete_room_image

logger = logging.getLogger(__name__)

def create_room(
    request: RoomCreateRequest,
    files: list[UploadFile],
    uid: str,
):
  db = get_firebase_client()
  room_ref = db.collection("rooms").document()
  now = datetime.now(timezone.utc)# 共通化

  # 重複部屋チェック
  duplicate_docs = list(
    db.collection("rooms")
    .where("building_id", "==", request.building_id)
    .where("roomNumber", "==", request.room.roomNumber)
    .stream()
  )

  if duplicate_docs:
    raise HTTPException(status_code=400, detail=f"部屋番号：{request.room.roomNumber} はすでに登録されています。")

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


def update_room(
    room_id: str,
    request: RoomUpdateRequest,
    files: list[UploadFile] | None = None,
) -> dict:
  db = get_firebase_client()
  room_ref = db.collection("rooms").document(room_id)
  now = datetime.now(timezone.utc)
  # 共通化できる
  current_doc = room_ref.get()
  current_data = current_doc.to_dict() if current_doc.exists else {}
  current_images = current_data.get("images", [])
  building_id = current_data.get("building_id")
  room_number = request.room.roomNumber

  # 重複部屋チェック（自分自身は除外）
  duplicate_docs = [
    doc for doc in (
      db.collection("rooms")
      .where("building_id", "==", building_id)
      .where("roomNumber", "==", room_number)
      .stream()
    )
    if doc.id != room_id
  ]

  if duplicate_docs:
    raise HTTPException(status_code=400, detail=f"部屋番号：{room_number} はすでに登録されています。")

  removed_keys = set(request.removedImageKeys)
  images = []
  keys_to_delete = []

  for image in current_images:
    if image.get("image_key") in removed_keys:
      keys_to_delete.append(image.get("image_key"))
    else:
      images.append(image)

  for file in files or []:
    image_data = upload_room_image(
      file=file,
      room_id=room_id
    )
    images.append(image_data)

  data = {
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
    "updated_at": now,
  }

  # Firestoreの更新が確定した後にのみB2の古い画像を削除する
  # (削除を先に行うとFirestore更新が失敗した際に実体のない画像を参照し続けてしまうため)
  room_ref.update(data)

  for image_key in keys_to_delete:
    try:
      delete_room_image(image_key)
    except Exception:
      logger.exception(f"B2画像削除に失敗しました: image_key={image_key}")

  return {"id": room_id, **data}