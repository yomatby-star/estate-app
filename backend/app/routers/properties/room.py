import logging
import json
from fastapi import APIRouter, Depends, status, HTTPException, File, Form, UploadFile

from app.dependencies.auth import get_current_user
from app.schemas.room import RoomCreateRequest, RoomUpdateRequest
from app.service.room_service import create_room, update_room

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/roomRegister", tags=["roomRegister"])

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_property_room(
  payload: str = Form(...),
  files: list[UploadFile] = File(default=[]),
  current_user: dict = Depends(get_current_user)
) -> dict:
  
  try:
    request = RoomCreateRequest.model_validate(
      json.loads(payload)
    )

    print(request.model_dump())
    print(len(files))

    data = create_room(
      request,
      files,
      uid=current_user["uid"]
    )

    return {
      "message": "部屋登録成功",
      "data": data
    }

  except HTTPException:
    raise

  except Exception:
    logger.exception("部屋登録処理でエラーが発生しました")
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="部屋登録に失敗しました"
    )


@router.put("/{room_id}")
async def update_property_room(
  room_id: str,
  payload: str = Form(...),
  files: list[UploadFile] = File(default=[]),
  current_user: dict = Depends(get_current_user)
) -> dict:

  try:
    request = RoomUpdateRequest.model_validate(
      json.loads(payload)
    )

    data = update_room(
      room_id,
      request,
      files
    )

    return {
      "message": "部屋更新成功",
      "data": data
    }

  except HTTPException:
    raise

  except Exception:
    logger.exception("部屋更新処理でエラーが発生しました")
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="部屋更新に失敗しました"
    )