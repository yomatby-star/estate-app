import logging
from fastapi import APIRouter, Depends, status, HTTPException

from app.dependencies.auth import get_current_user
from app.schemas.room import RoomCreateRequest
from app.service.room_service import create_room

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/roomRegister", tags=["roomRegister"])

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_property_room(
  request: RoomCreateRequest,
  current_user: dict = Depends(get_current_user)
) -> dict:
  try:
    data = create_room(
      request,
      uid=current_user["uid"]
    )

    return {
      "message": "部屋登録成功",
      "data": data
    }
  except Exception:
    logger.exception("部屋登録処理でエラーが発生しました")
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail="部屋登録に失敗しました"
    )