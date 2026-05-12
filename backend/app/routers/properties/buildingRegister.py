import logging
from fastapi import APIRouter, Depends, HTTPException
from app.dependencies.auth import get_current_user
from app.schemas.property import PropertyCreateRequest
from app.service.building_service import create_building

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/buildingRegister", tags=["buildingRegister"])

@router.post("")
async def create_property_building(request: PropertyCreateRequest, current_user: dict = Depends(get_current_user)):
  try: 
    data = create_building(request, current_user["uid"])
    return {
      "message": "物件登録完了",
      "data": data
    }
  except Exception:
    logger.exception("物件登録処理でエラーが発生しました")
    raise HTTPException (
      status_code=500,
      detail="物件登録に失敗しました。"
    )